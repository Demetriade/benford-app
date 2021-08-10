use std::fs::File;
use std::io::BufReader;

extern crate base64;
extern crate jpeg_decoder as jpeg;
use serde_json::{json, Value};
use lambda_runtime::{handler_fn, Context, Error};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let func = handler_fn(start);
    lambda_runtime::run(func).await?;
    Ok(())
}

// https://dev.to/nicholaschiasson/beginner-s-guide-to-running-rust-on-aws-lambda-277n

async fn start(event: Value, _: Context) -> Result<Value, Error> {
    let encoded_image = event["uploadedImage"].as_str().unwrap();
    let pixels = decode_b64_img(encoded_image);
    //let pixels = decode_img("G:\\projets\\benford-app\\api\\benford-rs\\src\\img\\poné.jpg");
    let counts = benford(&pixels);
    let len_pixels = pixels.len() as u32 - counts[0];
    let percents = get_percents(&counts, &len_pixels);
    let degree = calcul_confidence_degree(&counts, &percents);
    let response = json!({ "counts": counts, "percents": percents, "degree": degree });
    println!("{}", json!(response).to_string());

    Ok(response)
}

fn decode_b64_img(base64_image: &str) -> Vec<u8> {
    let decoded_image = base64::decode(base64_image).unwrap();
    let mut decoder = jpeg::Decoder::new(&*decoded_image);
    let pixels = decoder.decode().expect("failed to decode image");
    //let metadata = decoder.info().unwrap();
    pixels
}

fn decode_img(img_path: &str) -> Vec<u8> {
    let file = File::open(img_path).expect("failed to open file");
    let mut decoder = jpeg::Decoder::new(BufReader::new(file));
    decoder.decode().expect("failed to decode image")
}

fn benford(pixels: &Vec<u8>) -> Vec<u32> {
    let mut counts: Vec<u32> = vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i, pixel) in pixels.iter().enumerate() {
        let first_digit = get_first_digit(pixel);
        counts[first_digit as usize] += 1;
        println!("{}/{}", i, pixels.len());
    }
    counts
}

fn get_first_digit(number: &u8) -> u32 {
    number.to_string().chars().next().unwrap().to_digit(10).unwrap()
}

fn get_percents(counts: &Vec<u32>, len_pixels: &u32) -> Vec<f32> {
    let mut percents: Vec<f32> = Vec::new();
    for count in counts {
        percents.push((*count as f32)*100.0/(*len_pixels) as f32);
    }
    percents
}

fn calcul_confidence_degree(counts: &Vec<u32>, percents: &Vec<f32>) -> f32 {
    let mut result: f32 = 0.0;
    let mut previous: f32 = 0.0;
    for (i, count) in counts.iter().enumerate() {
        if i != 0 {
            let factor: f32 = f32::abs(*count as f32 - percents[i]) / (100.0*(100.0 - percents[i])) as f32;
            println!("current factor : {}", factor);
            if previous != 0.0 && previous < percents[i] {
                result += factor.powf(2.0);
                previous = percents[i];
            } else {
                result += factor;
                previous = percents[i];
            }
            println!("result : {}, previous : {}", result, previous);
        }
    }
    100.0 - result/9.0
}