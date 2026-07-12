---
title: Build contracts in Rust
description: "CosmWasm contract development on Safrochain: Rust toolchain, cargo test, and wasm optimizer."
sidebar_position: 2
---

## Prerequisites

- Rust stable + `wasm32-unknown-unknown` target
- `cargo-generate` or clone [cosmwasm-template](https://github.com/CosmWasm/cosmwasm-template)
- Docker (for `cosmwasm/optimizer`)

```bash
rustup target add wasm32-unknown-unknown
cargo install cargo-generate
cargo generate --git https://github.com/CosmWasm/cosmwasm-template.git --name my_contract
```

## Project layout

```
my_contract/
  src/
    contract.rs   # instantiate, execute, query
    msg.rs        # JSON message types
    state.rs      # storage
  Cargo.toml      # cosmwasm-std dependency
```

## Minimal handlers

```rust
use cosmwasm_std::{Deps, DepsMut, Env, MessageInfo, Response, StdResult};

pub fn instantiate(_deps: DepsMut, _env: Env, _info: MessageInfo, _msg: InstantiateMsg) -> StdResult<Response> {
    Ok(Response::new().add_attribute("action", "instantiate"))
}

pub fn execute(_deps: DepsMut, _env: Env, _info: MessageInfo, _msg: ExecuteMsg) -> StdResult<Response> {
    Ok(Response::new().add_attribute("action", "execute"))
}

pub fn query(_deps: Deps, _env: Env, _msg: QueryMsg) -> StdResult<Binary> {
    todo!()
}
```

## Test and build

```bash
cargo test
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  cosmwasm/optimizer:0.16.0
# artifacts/my_contract.wasm
```

## Next

- [Deploy and manage](./deploy-and-manage)
- Infra CLI reference: [wasm module](/modules/wasm)
