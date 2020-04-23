# NOTAREOS
# Notario Digital para Blockchain EOSIO 
Este contrato inteligente sirve como herramienta para un usuario que desee registrar la existencia de documentos digitales (textos / imágenes) en un momento determinado del tiempo.
También permite a cualquier persona que posea el documento validar el registro en la cadena de bloques.
## Acción - `{{ anotar }}`
### Descripción
La intención de la acción `{{anotar}}` es probar la existencia de un hash SHA-256 en una fecha y hora específicas y también quien ejecuta esta acción. 
Los datos se almacenan en la cadena de bloques, opcionalmente los datos se pueden guardar en una tabla de memoria RAM, lo cual tiene un costo pero facilita la recuperación de datos.
Si el usuario solo guarda en el blockchain debe guardar la identificación de la transacción para recuperarla si es necesario.
El usuario puede guardar un hash solo una vez. ( no se permite guardar el mismo hash dos veces en una tabla)
### Parameteros
**usuario** = `{{ usuario }}`, Cuenta que ejecuta la acción y guarda el hash del contenido.

**hash** = `{{ hash }}`, Identificador criptográfico SHA-256 calculado de un archivo o de algún texto.

**guardar_en_tabla** = `{{ guardar_en_tabla }}`, Si es igual a verdadero o 1 guarda el hash y la identificación de la 
transacción en la tabla `libro`. Este registro será guardado en memoria RAM por lo que debe ser pagado por el ejecutor de la acción y podría liberarse si es necesario. (opcional)

**comentario** = `{{ comentario }}`, utilizado como descripción o resumen.

**contenido** = `{{ contenido }}`, Se utiliza opcionalmente para cargar un archivo sin formato o contenido de texto libre. tenga en cuenta que esto no se verifica con el hash.

## Acción - `{{ limpiar }}`
### Descripción
Esta acción borra lo registros de la tabla y debe usarse para desarrollo 
## Tablas - `{{ Libro }}`
### Descripción 
Tabla que contiene aquellos registros que están disponibles en RAM.
### Campos
- id *(indice primario)*
- hash *(indice secundario)*
