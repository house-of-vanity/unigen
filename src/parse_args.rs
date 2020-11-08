use clap::{App, Arg};
use crate::unit::{UnitType};

#[derive(Debug)]
pub struct Config {
    pub unit_type: UnitType,
    pub name: String,
    pub description: String,
}

pub fn read() -> Config {
    // Parse opts and args
    //let yaml = load_yaml!("../misc/cli.yml");
    //let mut cli_args = App::from(yaml).get_matches();
    let mut cli_args = App::new(env!("CARGO_PKG_NAME"))
        .version(env!("CARGO_PKG_VERSION"))
        .author(env!("CARGO_PKG_AUTHORS"))
        .about(env!("CARGO_PKG_DESCRIPTION"))
        .arg(
            Arg::new("type")
                .about("Type of unit")
                .possible_values(&["timer", "service"])
                .required(true)
        )
        .arg(
            Arg::new("name")
                .about("Name of unit")
                .short('n')
                .long("name")
                .default_value("Dummy unit")
        )
        .arg(
            Arg::new("description")
                .short('d')
                .long("description")
                .default_value(format!("Unit created with {}", env!("CARGO_PKG_NAME")).as_str())
        )
        .get_matches();

    Config {
        unit_type: match cli_args.value_of("type").unwrap() {
            "service" => {
                UnitType::service
            }
            "timer" => {
                UnitType::timer
            }
            _ => unreachable!(),
        },
        name: match cli_args.value_of("name") {
            Some(name) => name.to_string(),
            None => unreachable!()
        },
        description: match cli_args.value_of("description") {
            Some(description) => description.to_string(),
            None => unreachable!()
        },
    }
}