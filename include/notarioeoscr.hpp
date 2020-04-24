#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT notarioeoscr : public contract {
  public:
    using contract::contract;

    ACTION anotar(name usuario, const checksum256 &hash, bool guardar_en_tabla, string comentario, string contenido);
    ACTION limpiar();

  private:
    TABLE book {
      uint64_t id;
      checksum256 hash;
      checksum256 tx;
      auto primary_key() const { return id; }
      checksum256 get_hash() const { return hash; }
      EOSLIB_SERIALIZE(book,
       (id)(hash)(tx));
    };
    typedef multi_index<name("libro"), book,
    indexed_by< "porhash"_n, const_mem_fun<book, checksum256, &book::get_hash>>> book_table;
};
