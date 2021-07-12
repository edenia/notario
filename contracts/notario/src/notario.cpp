#include <notario.hpp>
#include <eosio/transaction.hpp>
#include <eosio/crypto.hpp>

ACTION notario::anotar(name usuario, const checksum256 &hash, bool guardar_en_tabla, string titulo, string contenido, string comentario)
{
  require_auth(usuario);
  if (!guardar_en_tabla)
  {
    return;
  }

  book_table _records(get_self(), get_self().value);

  auto by_hash = _records.get_index<"porhash"_n>();

  auto by_hash_itr = by_hash.find(hash);
  check(by_hash_itr == by_hash.end(), "Hash ya existente");

  auto s = eosio::read_transaction(nullptr, 0);
  char *tx = (char *)malloc(s);
  read_transaction(tx, s);
  auto txid = sha256(tx, s);
  _records.emplace(usuario, [&](auto &row) {
    row.id = _records.available_primary_key();
    row.hash = hash;
    row.tx = txid;
  });
}

ACTION notario::limpiar()
{
  // DEV only
  require_auth(get_self());

  book_table _records(get_self(), get_self().value);

  auto records_itr = _records.begin();
  while (records_itr != _records.end())
  {
    records_itr = _records.erase(records_itr);
  }
}

EOSIO_DISPATCH(notario, (anotar)(limpiar))
