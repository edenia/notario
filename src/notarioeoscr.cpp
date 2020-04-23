#include <notarioeoscr.hpp>
#include <cmath>
#include <eosio/system.hpp>

ACTION notarioeoscr::anotar(name usuario, const checksum256 &hash, bool guardar_en_tabla, string comentario, string contenido) {
  require_auth(usuario);
  if (!guardar_en_tabla)
  {
    return;
  }

  book_table _records(get_self(), get_self().value);

  auto by_hash = _records.get_index<"porhash"_n>();

  auto by_hash_itr = by_hash.find(hash);
  check(by_hash_itr == by_hash.end(), "Hash ya existente");

  _records.emplace(usuario, [&](auto& row) {
    row.id = _records.available_primary_key();
    row.hash = hash;
  });
}

ACTION notarioeoscr::limpiar() {
  // DEV only
  require_auth(get_self());

  book_table _records(get_self(), get_self().value);

  auto records_itr = _records.begin();
  while (records_itr != _records.end()) {
    records_itr = _records.erase(records_itr);
  }
}

EOSIO_DISPATCH(notarioeoscr, (anotar)(limpiar))
