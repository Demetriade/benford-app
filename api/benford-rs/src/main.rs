use std::{collections::HashMap};

extern crate base64;
extern crate jpeg_decoder as jpeg;

fn main() {
    let base64_image = "";
    let decoded_image = base64::decode(base64_image).unwrap();

    let mut decoder = jpeg::Decoder::new(&*decoded_image);
    let pixels = decoder.decode().expect("failed to decode image");
    // let metadata = decoder.info().unwrap();

    let counts = benford(pixels);
    println!("Counts : {:?}", counts);
}

fn benford(pixels: Vec<u8>) -> HashMap<char, u32> {
    let mut counts: HashMap<char, u32> = HashMap::new();
    for (i, pixel) in pixels.iter().enumerate() {
        let first_digit = get_first_digit(pixel);
        let next_value = counts.get(&first_digit).unwrap_or(&0) + 1;
        counts.insert(first_digit, next_value);
        println!("{}/{}", i, pixels.len());
    }
    counts
}

fn get_first_digit(number: &u8) -> char {
    number.to_string().chars().next().unwrap()
}
