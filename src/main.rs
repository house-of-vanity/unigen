extern crate handlebars;

use std::error::Error;
use handlebars::Handlebars;
use std::collections::HashMap;

mod unit;
#[macro_use]
mod parse_args;

fn main() -> Result<(), Box<dyn Error>> {
    let cfg = parse_args::read();
    let x = unit::Unit::new(&cfg);
    let mut registry = Handlebars::new();
    let template= r#"
{{ #each blocks }}[{{ this.type }}]
{{ #each options }}{{ this.key }}={{ this.value }}
{{ /each }}
{{ /each }}"#.to_string();
    registry.register_template_string("Unit", template)?;

    let mut data = HashMap::new();
    data.insert("name", "Rust");
    print!("{}", registry.render("Unit", &x)?);
    //println!("{:?}", cfg);

    Ok(())
}
