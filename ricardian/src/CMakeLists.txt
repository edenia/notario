project(notarioeoscr)

set(EOSIO_WASM_OLD_BEHAVIOR "Off")
find_package(eosio.cdt)

add_contract( notarioeoscr notarioeoscr notarioeoscr.cpp )
target_include_directories( notarioeoscr PUBLIC ${CMAKE_SOURCE_DIR}/../include )
target_ricardian_directory( notarioeoscr ${CMAKE_SOURCE_DIR}/../ricardian )