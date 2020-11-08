use serde::{Serialize, Deserialize};
use crate::parse_args::Config;

#[derive(Serialize, Deserialize, Debug)]
pub struct Option {
    key: String,
    value: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum BlockType {
    Unit,
    Service,
    Timer,
    Install,
}

#[allow(non_camel_case_types)]
#[derive(Serialize, Deserialize, Debug)]
pub enum UnitType {
    service,
    timer,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Block {
    r#type: BlockType,
    options: Vec<Option>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Unit {
    name: String,
    blocks: Vec<Block>,
}

impl Unit {
    pub fn new(config: &Config) -> Unit {
        // Default unit is a Service
        Unit{
            name: config.name.clone(),
            blocks: vec![
                Block{
                    r#type: BlockType::Unit,
                    options: vec![
                        Option{
                            key: "Description".to_string(),
                            value: config.description.clone()
                        },
                        Option{
                            key: "After".to_string(),
                            value: "network.target".to_string()
                        },
                        Option{
                            key: "Wants".to_string(),
                            value: "network-online.target".to_string()
                        },
                    ]
                },
                Block{
                    r#type: BlockType::Service,
                    options: vec![
                        Option{
                            key: "Restart".to_string(),
                            value: "always".to_string()
                        },
                        Option{
                            key: "Type".to_string(),
                            value: "simple".to_string()
                        },
                        Option{
                            key: "ExecStart".to_string(),
                            value: "".to_string()
                        },
                    ]
                },
                Block{
                    r#type: BlockType::Install,
                    options: vec![
                        Option{
                            key: "WantedBy".to_string(),
                            value: "multi-user.target".to_string()
                        },
                    ]
                },
            ]
        }
    }
    //pub fn
}