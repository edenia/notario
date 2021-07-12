deploy_contract() {
    echo 'Deploy Smart Contract'
    mkdir -p ./stdout/notario
    TEMP_DIR=./stdout/notario

    cleos -u https://lacchain.eosio.cr push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://lacchain.eosio.cr set contract notario -j -d -s ../notario >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u https://lacchain.eosio.cr -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p notario@active
}

deploy_contract