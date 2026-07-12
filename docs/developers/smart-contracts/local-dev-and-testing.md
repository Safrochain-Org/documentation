---
title: Local dev and testing
description: "Unit test CosmWasm contracts with cw-multi-test and optional local wasmd nodes."
sidebar_position: 5
---

## Unit tests (cw-multi-test)

Add to `Cargo.toml`:

```toml
[dev-dependencies]
cw-multi-test = "2.0"
```

```rust
use cw_multi_test::{App, Executor};
use cosmwasm_std::Addr;

#[test]
fn instantiate_works() {
    let mut app = App::default();
    let code_id = app.store_code(my_contract_wasm());
    let contract = app
        .instantiate_contract(code_id, Addr::unchecked("owner"), &init_msg, &[], "label", None)
        .unwrap();
    assert!(contract.to_string().starts_with("cosmos"));
}
```

## Local chain

| Option | Use |
| --- | --- |
| [Local devnet](/run-a-node/local-devnet) | Full `safrochaind` on `safro-devnet-1` (recommended) |
| [Local testnet](/run-a-node/local-testnet) | Minimal manual init |
| `wasmd` | Upstream CosmWasm dev node |

Build note: CosmWasm may require `clang` on your machine. See [install](/run-a-node/install).

## Deploy loop

1. `cargo test`
2. `cosmwasm/optimizer` → `.wasm`
3. `tx wasm store` on local or testnet
4. [Interact from apps](./interact-from-apps) against local REST
