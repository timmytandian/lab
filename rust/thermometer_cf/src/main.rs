use std::io;


fn greet() -> String {        
    println!("Choose menu (1/2/3):");
    println!("1. Celcius -> Fahrenheit");
    println!("2. Fahrenheit -> Celcius");
    println!("3. Exit");

    let mut menu = String::new();
    io::stdin()
        .read_line(&mut menu)
        .expect("Failed to read line");
    println!("you chosed menu:{}", menu);
    let menu = menu.trim();
    menu.to_string()
}


fn convert(is_mode_to_celcius: bool) {
    let mut from_unit = String::new();
    let mut to_unit = String::new();
    let mut from_temp = String::new();
    let to_temp: f32;

    if is_mode_to_celcius {
        from_unit.push_str("Fahrenheit");
        to_unit.push_str("Celcius");
    } else {
        from_unit.push_str("Celcius");
        to_unit.push_str("Fahrenheit");
    }
    
    println!("Insert temperature in {from_unit}: ");


    io::stdin()
        .read_line(&mut from_temp)
        .expect("Failed to read line");

    let from_temp: f32 = match from_temp.trim().parse() {
        Ok(num) => num,
        Err(_) => 0.0,
    };

    if is_mode_to_celcius { // convert from fahrenheit to celcius
        to_temp = (from_temp -32.0) * 5.0/9.0
    } else {// convert from celcius to fahrenheit
        to_temp = (from_temp *9.0/5.0) + 32.0
    }
    

    println!("{from_temp} {from_unit} = {to_temp} {to_unit}");


}

fn main() {

    println!("Welcome to temperature converter");

    loop {
        let menu = greet();

        if menu.eq("1") {
            convert(false);
        } else if menu.eq("2") {
            convert(true);
        } else if menu.eq("3") { 
            println!("Bye bye!");
            break;
        } else {
            continue;
        }

        
    }
}
