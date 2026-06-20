
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Categoria
 * MODELO: Categoria
 * Representa as categorias dos produtos (ex: "Cervejas", "Destilados", etc.)
 * Alimenta o campo de seleção (Select) do formulário de cadastro.
 */
export type Categoria = $Result.DefaultSelection<Prisma.$CategoriaPayload>
/**
 * Model Produto
 * MODELO: Produto
 * Contém todos os campos mapeados diretamente das imagens do formulário "Novo Produto".
 */
export type Produto = $Result.DefaultSelection<Prisma.$ProdutoPayload>
/**
 * Model Movimentacao
 * MODELO: Movimentacao (Saída / Expedição)
 * Registra o fluxo de saída mapeado na imagem "Registrar Saída / Expedição".
 */
export type Movimentacao = $Result.DefaultSelection<Prisma.$MovimentacaoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Categorias
 * const categorias = await prisma.categoria.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Categorias
   * const categorias = await prisma.categoria.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.categoria`: Exposes CRUD operations for the **Categoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categoria.findMany()
    * ```
    */
  get categoria(): Prisma.CategoriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.produto`: Exposes CRUD operations for the **Produto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produtos
    * const produtos = await prisma.produto.findMany()
    * ```
    */
  get produto(): Prisma.ProdutoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movimentacao`: Exposes CRUD operations for the **Movimentacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movimentacaos
    * const movimentacaos = await prisma.movimentacao.findMany()
    * ```
    */
  get movimentacao(): Prisma.MovimentacaoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Categoria: 'Categoria',
    Produto: 'Produto',
    Movimentacao: 'Movimentacao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "categoria" | "produto" | "movimentacao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Categoria: {
        payload: Prisma.$CategoriaPayload<ExtArgs>
        fields: Prisma.CategoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findFirst: {
            args: Prisma.CategoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findMany: {
            args: Prisma.CategoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          create: {
            args: Prisma.CategoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          createMany: {
            args: Prisma.CategoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          delete: {
            args: Prisma.CategoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          update: {
            args: Prisma.CategoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          deleteMany: {
            args: Prisma.CategoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoriaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          upsert: {
            args: Prisma.CategoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria>
          }
          groupBy: {
            args: Prisma.CategoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriaCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number
          }
        }
      }
      Produto: {
        payload: Prisma.$ProdutoPayload<ExtArgs>
        fields: Prisma.ProdutoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProdutoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProdutoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findFirst: {
            args: Prisma.ProdutoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProdutoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findMany: {
            args: Prisma.ProdutoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          create: {
            args: Prisma.ProdutoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          createMany: {
            args: Prisma.ProdutoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProdutoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          delete: {
            args: Prisma.ProdutoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          update: {
            args: Prisma.ProdutoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          deleteMany: {
            args: Prisma.ProdutoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProdutoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProdutoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          upsert: {
            args: Prisma.ProdutoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          aggregate: {
            args: Prisma.ProdutoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduto>
          }
          groupBy: {
            args: Prisma.ProdutoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProdutoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProdutoCountArgs<ExtArgs>
            result: $Utils.Optional<ProdutoCountAggregateOutputType> | number
          }
        }
      }
      Movimentacao: {
        payload: Prisma.$MovimentacaoPayload<ExtArgs>
        fields: Prisma.MovimentacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovimentacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovimentacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload>
          }
          findFirst: {
            args: Prisma.MovimentacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovimentacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload>
          }
          findMany: {
            args: Prisma.MovimentacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload>[]
          }
          create: {
            args: Prisma.MovimentacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload>
          }
          createMany: {
            args: Prisma.MovimentacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovimentacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload>[]
          }
          delete: {
            args: Prisma.MovimentacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload>
          }
          update: {
            args: Prisma.MovimentacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload>
          }
          deleteMany: {
            args: Prisma.MovimentacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovimentacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovimentacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload>[]
          }
          upsert: {
            args: Prisma.MovimentacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimentacaoPayload>
          }
          aggregate: {
            args: Prisma.MovimentacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovimentacao>
          }
          groupBy: {
            args: Prisma.MovimentacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovimentacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovimentacaoCountArgs<ExtArgs>
            result: $Utils.Optional<MovimentacaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    categoria?: CategoriaOmit
    produto?: ProdutoOmit
    movimentacao?: MovimentacaoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoriaCountOutputType
   */

  export type CategoriaCountOutputType = {
    produtos: number
  }

  export type CategoriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | CategoriaCountOutputTypeCountProdutosArgs
  }

  // Custom InputTypes
  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriaCountOutputType
     */
    select?: CategoriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountProdutosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutoWhereInput
  }


  /**
   * Count Type ProdutoCountOutputType
   */

  export type ProdutoCountOutputType = {
    movimentacoes: number
  }

  export type ProdutoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movimentacoes?: boolean | ProdutoCountOutputTypeCountMovimentacoesArgs
  }

  // Custom InputTypes
  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProdutoCountOutputType
     */
    select?: ProdutoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountMovimentacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovimentacaoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null
    _avg: CategoriaAvgAggregateOutputType | null
    _sum: CategoriaSumAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  export type CategoriaAvgAggregateOutputType = {
    id: number | null
  }

  export type CategoriaSumAggregateOutputType = {
    id: number | null
  }

  export type CategoriaMinAggregateOutputType = {
    id: number | null
    nome: string | null
    createdAt: Date | null
  }

  export type CategoriaMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    createdAt: Date | null
  }

  export type CategoriaCountAggregateOutputType = {
    id: number
    nome: number
    createdAt: number
    _all: number
  }


  export type CategoriaAvgAggregateInputType = {
    id?: true
  }

  export type CategoriaSumAggregateInputType = {
    id?: true
  }

  export type CategoriaMinAggregateInputType = {
    id?: true
    nome?: true
    createdAt?: true
  }

  export type CategoriaMaxAggregateInputType = {
    id?: true
    nome?: true
    createdAt?: true
  }

  export type CategoriaCountAggregateInputType = {
    id?: true
    nome?: true
    createdAt?: true
    _all?: true
  }

  export type CategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categoria to aggregate.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categorias
    **/
    _count?: true | CategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriaMaxAggregateInputType
  }

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>
  }




  export type CategoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithAggregationInput | CategoriaOrderByWithAggregationInput[]
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum
    having?: CategoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriaCountAggregateInputType | true
    _avg?: CategoriaAvgAggregateInputType
    _sum?: CategoriaSumAggregateInputType
    _min?: CategoriaMinAggregateInputType
    _max?: CategoriaMaxAggregateInputType
  }

  export type CategoriaGroupByOutputType = {
    id: number
    nome: string
    createdAt: Date
    _count: CategoriaCountAggregateOutputType | null
    _avg: CategoriaAvgAggregateOutputType | null
    _sum: CategoriaSumAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  type GetCategoriaGroupByPayload<T extends CategoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
        }
      >
    >


  export type CategoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    createdAt?: boolean
    produtos?: boolean | Categoria$produtosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectScalar = {
    id?: boolean
    nome?: boolean
    createdAt?: boolean
  }

  export type CategoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "createdAt", ExtArgs["result"]["categoria"]>
  export type CategoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | Categoria$produtosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoriaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoriaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categoria"
    objects: {
      produtos: Prisma.$ProdutoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      createdAt: Date
    }, ExtArgs["result"]["categoria"]>
    composites: {}
  }

  type CategoriaGetPayload<S extends boolean | null | undefined | CategoriaDefaultArgs> = $Result.GetResult<Prisma.$CategoriaPayload, S>

  type CategoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriaCountAggregateInputType | true
    }

  export interface CategoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categoria'], meta: { name: 'Categoria' } }
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {CategoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriaFindUniqueArgs>(args: SelectSubset<T, CategoriaFindUniqueArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriaFindFirstArgs>(args?: SelectSubset<T, CategoriaFindFirstArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriaWithIdOnly = await prisma.categoria.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriaFindManyArgs>(args?: SelectSubset<T, CategoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria.
     * @param {CategoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     * 
     */
    create<T extends CategoriaCreateArgs>(args: SelectSubset<T, CategoriaCreateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {CategoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriaCreateManyArgs>(args?: SelectSubset<T, CategoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {CategoriaCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoriaCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categoria.
     * @param {CategoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     * 
     */
    delete<T extends CategoriaDeleteArgs>(args: SelectSubset<T, CategoriaDeleteArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria.
     * @param {CategoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriaUpdateArgs>(args: SelectSubset<T, CategoriaUpdateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {CategoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriaDeleteManyArgs>(args?: SelectSubset<T, CategoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriaUpdateManyArgs>(args: SelectSubset<T, CategoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias and returns the data updated in the database.
     * @param {CategoriaUpdateManyAndReturnArgs} args - Arguments to update many Categorias.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoriaUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoriaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categoria.
     * @param {CategoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends CategoriaUpsertArgs>(args: SelectSubset<T, CategoriaUpsertArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends CategoriaCountArgs>(
      args?: Subset<T, CategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriaAggregateArgs>(args: Subset<T, CategoriaAggregateArgs>): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriaGroupByArgs['orderBy'] }
        : { orderBy?: CategoriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categoria model
   */
  readonly fields: CategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produtos<T extends Categoria$produtosArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$produtosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categoria model
   */
  interface CategoriaFieldRefs {
    readonly id: FieldRef<"Categoria", 'Int'>
    readonly nome: FieldRef<"Categoria", 'String'>
    readonly createdAt: FieldRef<"Categoria", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Categoria findUnique
   */
  export type CategoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findUniqueOrThrow
   */
  export type CategoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findFirst
   */
  export type CategoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findFirstOrThrow
   */
  export type CategoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findMany
   */
  export type CategoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria create
   */
  export type CategoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Categoria.
     */
    data: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
  }

  /**
   * Categoria createMany
   */
  export type CategoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria createManyAndReturn
   */
  export type CategoriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria update
   */
  export type CategoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Categoria.
     */
    data: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
    /**
     * Choose, which Categoria to update.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria updateMany
   */
  export type CategoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria updateManyAndReturn
   */
  export type CategoriaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria upsert
   */
  export type CategoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Categoria to update in case it exists.
     */
    where: CategoriaWhereUniqueInput
    /**
     * In case the Categoria found by the `where` argument doesn't exist, create a new Categoria with this data.
     */
    create: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
    /**
     * In case the Categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
  }

  /**
   * Categoria delete
   */
  export type CategoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter which Categoria to delete.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria deleteMany
   */
  export type CategoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to delete.
     */
    limit?: number
  }

  /**
   * Categoria.produtos
   */
  export type Categoria$produtosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    where?: ProdutoWhereInput
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    cursor?: ProdutoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Categoria without action
   */
  export type CategoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
  }


  /**
   * Model Produto
   */

  export type AggregateProduto = {
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  export type ProdutoAvgAggregateOutputType = {
    id: number | null
    unidadesPorPack: number | null
    qtdAtual: number | null
    qtdMinima: number | null
    qtdMaxima: number | null
    custoDeCompra: Decimal | null
    precoDeVenda: Decimal | null
    categoriaId: number | null
  }

  export type ProdutoSumAggregateOutputType = {
    id: number | null
    unidadesPorPack: number | null
    qtdAtual: number | null
    qtdMinima: number | null
    qtdMaxima: number | null
    custoDeCompra: Decimal | null
    precoDeVenda: Decimal | null
    categoriaId: number | null
  }

  export type ProdutoMinAggregateOutputType = {
    id: number | null
    dataCadastro: Date | null
    nome: string | null
    unidadesPorPack: number | null
    qtdAtual: number | null
    qtdMinima: number | null
    qtdMaxima: number | null
    custoDeCompra: Decimal | null
    precoDeVenda: Decimal | null
    categoriaId: number | null
  }

  export type ProdutoMaxAggregateOutputType = {
    id: number | null
    dataCadastro: Date | null
    nome: string | null
    unidadesPorPack: number | null
    qtdAtual: number | null
    qtdMinima: number | null
    qtdMaxima: number | null
    custoDeCompra: Decimal | null
    precoDeVenda: Decimal | null
    categoriaId: number | null
  }

  export type ProdutoCountAggregateOutputType = {
    id: number
    dataCadastro: number
    nome: number
    unidadesPorPack: number
    qtdAtual: number
    qtdMinima: number
    qtdMaxima: number
    custoDeCompra: number
    precoDeVenda: number
    categoriaId: number
    _all: number
  }


  export type ProdutoAvgAggregateInputType = {
    id?: true
    unidadesPorPack?: true
    qtdAtual?: true
    qtdMinima?: true
    qtdMaxima?: true
    custoDeCompra?: true
    precoDeVenda?: true
    categoriaId?: true
  }

  export type ProdutoSumAggregateInputType = {
    id?: true
    unidadesPorPack?: true
    qtdAtual?: true
    qtdMinima?: true
    qtdMaxima?: true
    custoDeCompra?: true
    precoDeVenda?: true
    categoriaId?: true
  }

  export type ProdutoMinAggregateInputType = {
    id?: true
    dataCadastro?: true
    nome?: true
    unidadesPorPack?: true
    qtdAtual?: true
    qtdMinima?: true
    qtdMaxima?: true
    custoDeCompra?: true
    precoDeVenda?: true
    categoriaId?: true
  }

  export type ProdutoMaxAggregateInputType = {
    id?: true
    dataCadastro?: true
    nome?: true
    unidadesPorPack?: true
    qtdAtual?: true
    qtdMinima?: true
    qtdMaxima?: true
    custoDeCompra?: true
    precoDeVenda?: true
    categoriaId?: true
  }

  export type ProdutoCountAggregateInputType = {
    id?: true
    dataCadastro?: true
    nome?: true
    unidadesPorPack?: true
    qtdAtual?: true
    qtdMinima?: true
    qtdMaxima?: true
    custoDeCompra?: true
    precoDeVenda?: true
    categoriaId?: true
    _all?: true
  }

  export type ProdutoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produto to aggregate.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Produtos
    **/
    _count?: true | ProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProdutoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProdutoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutoMaxAggregateInputType
  }

  export type GetProdutoAggregateType<T extends ProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregateProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduto[P]>
      : GetScalarType<T[P], AggregateProduto[P]>
  }




  export type ProdutoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutoWhereInput
    orderBy?: ProdutoOrderByWithAggregationInput | ProdutoOrderByWithAggregationInput[]
    by: ProdutoScalarFieldEnum[] | ProdutoScalarFieldEnum
    having?: ProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutoCountAggregateInputType | true
    _avg?: ProdutoAvgAggregateInputType
    _sum?: ProdutoSumAggregateInputType
    _min?: ProdutoMinAggregateInputType
    _max?: ProdutoMaxAggregateInputType
  }

  export type ProdutoGroupByOutputType = {
    id: number
    dataCadastro: Date
    nome: string
    unidadesPorPack: number
    qtdAtual: number
    qtdMinima: number
    qtdMaxima: number
    custoDeCompra: Decimal
    precoDeVenda: Decimal
    categoriaId: number
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  type GetProdutoGroupByPayload<T extends ProdutoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
        }
      >
    >


  export type ProdutoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataCadastro?: boolean
    nome?: boolean
    unidadesPorPack?: boolean
    qtdAtual?: boolean
    qtdMinima?: boolean
    qtdMaxima?: boolean
    custoDeCompra?: boolean
    precoDeVenda?: boolean
    categoriaId?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    movimentacoes?: boolean | Produto$movimentacoesArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataCadastro?: boolean
    nome?: boolean
    unidadesPorPack?: boolean
    qtdAtual?: boolean
    qtdMinima?: boolean
    qtdMaxima?: boolean
    custoDeCompra?: boolean
    precoDeVenda?: boolean
    categoriaId?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataCadastro?: boolean
    nome?: boolean
    unidadesPorPack?: boolean
    qtdAtual?: boolean
    qtdMinima?: boolean
    qtdMaxima?: boolean
    custoDeCompra?: boolean
    precoDeVenda?: boolean
    categoriaId?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectScalar = {
    id?: boolean
    dataCadastro?: boolean
    nome?: boolean
    unidadesPorPack?: boolean
    qtdAtual?: boolean
    qtdMinima?: boolean
    qtdMaxima?: boolean
    custoDeCompra?: boolean
    precoDeVenda?: boolean
    categoriaId?: boolean
  }

  export type ProdutoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dataCadastro" | "nome" | "unidadesPorPack" | "qtdAtual" | "qtdMinima" | "qtdMaxima" | "custoDeCompra" | "precoDeVenda" | "categoriaId", ExtArgs["result"]["produto"]>
  export type ProdutoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    movimentacoes?: boolean | Produto$movimentacoesArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProdutoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }
  export type ProdutoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }

  export type $ProdutoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Produto"
    objects: {
      categoria: Prisma.$CategoriaPayload<ExtArgs>
      movimentacoes: Prisma.$MovimentacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dataCadastro: Date
      nome: string
      unidadesPorPack: number
      qtdAtual: number
      qtdMinima: number
      qtdMaxima: number
      custoDeCompra: Prisma.Decimal
      precoDeVenda: Prisma.Decimal
      categoriaId: number
    }, ExtArgs["result"]["produto"]>
    composites: {}
  }

  type ProdutoGetPayload<S extends boolean | null | undefined | ProdutoDefaultArgs> = $Result.GetResult<Prisma.$ProdutoPayload, S>

  type ProdutoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProdutoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProdutoCountAggregateInputType | true
    }

  export interface ProdutoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Produto'], meta: { name: 'Produto' } }
    /**
     * Find zero or one Produto that matches the filter.
     * @param {ProdutoFindUniqueArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProdutoFindUniqueArgs>(args: SelectSubset<T, ProdutoFindUniqueArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Produto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProdutoFindUniqueOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProdutoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProdutoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProdutoFindFirstArgs>(args?: SelectSubset<T, ProdutoFindFirstArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProdutoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProdutoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produto.findMany()
     * 
     * // Get first 10 Produtos
     * const produtos = await prisma.produto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const produtoWithIdOnly = await prisma.produto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProdutoFindManyArgs>(args?: SelectSubset<T, ProdutoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Produto.
     * @param {ProdutoCreateArgs} args - Arguments to create a Produto.
     * @example
     * // Create one Produto
     * const Produto = await prisma.produto.create({
     *   data: {
     *     // ... data to create a Produto
     *   }
     * })
     * 
     */
    create<T extends ProdutoCreateArgs>(args: SelectSubset<T, ProdutoCreateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Produtos.
     * @param {ProdutoCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProdutoCreateManyArgs>(args?: SelectSubset<T, ProdutoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Produtos and returns the data saved in the database.
     * @param {ProdutoCreateManyAndReturnArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Produtos and only return the `id`
     * const produtoWithIdOnly = await prisma.produto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProdutoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProdutoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Produto.
     * @param {ProdutoDeleteArgs} args - Arguments to delete one Produto.
     * @example
     * // Delete one Produto
     * const Produto = await prisma.produto.delete({
     *   where: {
     *     // ... filter to delete one Produto
     *   }
     * })
     * 
     */
    delete<T extends ProdutoDeleteArgs>(args: SelectSubset<T, ProdutoDeleteArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Produto.
     * @param {ProdutoUpdateArgs} args - Arguments to update one Produto.
     * @example
     * // Update one Produto
     * const produto = await prisma.produto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProdutoUpdateArgs>(args: SelectSubset<T, ProdutoUpdateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Produtos.
     * @param {ProdutoDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProdutoDeleteManyArgs>(args?: SelectSubset<T, ProdutoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProdutoUpdateManyArgs>(args: SelectSubset<T, ProdutoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos and returns the data updated in the database.
     * @param {ProdutoUpdateManyAndReturnArgs} args - Arguments to update many Produtos.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Produtos and only return the `id`
     * const produtoWithIdOnly = await prisma.produto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProdutoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProdutoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Produto.
     * @param {ProdutoUpsertArgs} args - Arguments to update or create a Produto.
     * @example
     * // Update or create a Produto
     * const produto = await prisma.produto.upsert({
     *   create: {
     *     // ... data to create a Produto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produto we want to update
     *   }
     * })
     */
    upsert<T extends ProdutoUpsertArgs>(args: SelectSubset<T, ProdutoUpsertArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produto.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends ProdutoCountArgs>(
      args?: Subset<T, ProdutoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProdutoAggregateArgs>(args: Subset<T, ProdutoAggregateArgs>): Prisma.PrismaPromise<GetProdutoAggregateType<T>>

    /**
     * Group by Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProdutoGroupByArgs['orderBy'] }
        : { orderBy?: ProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Produto model
   */
  readonly fields: ProdutoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Produto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProdutoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categoria<T extends CategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoriaDefaultArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    movimentacoes<T extends Produto$movimentacoesArgs<ExtArgs> = {}>(args?: Subset<T, Produto$movimentacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Produto model
   */
  interface ProdutoFieldRefs {
    readonly id: FieldRef<"Produto", 'Int'>
    readonly dataCadastro: FieldRef<"Produto", 'DateTime'>
    readonly nome: FieldRef<"Produto", 'String'>
    readonly unidadesPorPack: FieldRef<"Produto", 'Int'>
    readonly qtdAtual: FieldRef<"Produto", 'Int'>
    readonly qtdMinima: FieldRef<"Produto", 'Int'>
    readonly qtdMaxima: FieldRef<"Produto", 'Int'>
    readonly custoDeCompra: FieldRef<"Produto", 'Decimal'>
    readonly precoDeVenda: FieldRef<"Produto", 'Decimal'>
    readonly categoriaId: FieldRef<"Produto", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Produto findUnique
   */
  export type ProdutoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findUniqueOrThrow
   */
  export type ProdutoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findFirst
   */
  export type ProdutoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findFirstOrThrow
   */
  export type ProdutoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findMany
   */
  export type ProdutoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto create
   */
  export type ProdutoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to create a Produto.
     */
    data: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
  }

  /**
   * Produto createMany
   */
  export type ProdutoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Produto createManyAndReturn
   */
  export type ProdutoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Produto update
   */
  export type ProdutoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to update a Produto.
     */
    data: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
    /**
     * Choose, which Produto to update.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto updateMany
   */
  export type ProdutoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
  }

  /**
   * Produto updateManyAndReturn
   */
  export type ProdutoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Produto upsert
   */
  export type ProdutoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The filter to search for the Produto to update in case it exists.
     */
    where: ProdutoWhereUniqueInput
    /**
     * In case the Produto found by the `where` argument doesn't exist, create a new Produto with this data.
     */
    create: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
    /**
     * In case the Produto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
  }

  /**
   * Produto delete
   */
  export type ProdutoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter which Produto to delete.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto deleteMany
   */
  export type ProdutoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produtos to delete
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to delete.
     */
    limit?: number
  }

  /**
   * Produto.movimentacoes
   */
  export type Produto$movimentacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    where?: MovimentacaoWhereInput
    orderBy?: MovimentacaoOrderByWithRelationInput | MovimentacaoOrderByWithRelationInput[]
    cursor?: MovimentacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovimentacaoScalarFieldEnum | MovimentacaoScalarFieldEnum[]
  }

  /**
   * Produto without action
   */
  export type ProdutoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
  }


  /**
   * Model Movimentacao
   */

  export type AggregateMovimentacao = {
    _count: MovimentacaoCountAggregateOutputType | null
    _avg: MovimentacaoAvgAggregateOutputType | null
    _sum: MovimentacaoSumAggregateOutputType | null
    _min: MovimentacaoMinAggregateOutputType | null
    _max: MovimentacaoMaxAggregateOutputType | null
  }

  export type MovimentacaoAvgAggregateOutputType = {
    id: number | null
    quantidade: number | null
    precoVendaUnitario: Decimal | null
    lucroEstimado: Decimal | null
    produtoId: number | null
  }

  export type MovimentacaoSumAggregateOutputType = {
    id: number | null
    quantidade: number | null
    precoVendaUnitario: Decimal | null
    lucroEstimado: Decimal | null
    produtoId: number | null
  }

  export type MovimentacaoMinAggregateOutputType = {
    id: number | null
    dataMovimentacao: Date | null
    quantidade: number | null
    precoVendaUnitario: Decimal | null
    tipo: string | null
    lucroEstimado: Decimal | null
    destinoCliente: string | null
    conferenteResponsavel: string | null
    produtoId: number | null
  }

  export type MovimentacaoMaxAggregateOutputType = {
    id: number | null
    dataMovimentacao: Date | null
    quantidade: number | null
    precoVendaUnitario: Decimal | null
    tipo: string | null
    lucroEstimado: Decimal | null
    destinoCliente: string | null
    conferenteResponsavel: string | null
    produtoId: number | null
  }

  export type MovimentacaoCountAggregateOutputType = {
    id: number
    dataMovimentacao: number
    quantidade: number
    precoVendaUnitario: number
    tipo: number
    lucroEstimado: number
    destinoCliente: number
    conferenteResponsavel: number
    produtoId: number
    _all: number
  }


  export type MovimentacaoAvgAggregateInputType = {
    id?: true
    quantidade?: true
    precoVendaUnitario?: true
    lucroEstimado?: true
    produtoId?: true
  }

  export type MovimentacaoSumAggregateInputType = {
    id?: true
    quantidade?: true
    precoVendaUnitario?: true
    lucroEstimado?: true
    produtoId?: true
  }

  export type MovimentacaoMinAggregateInputType = {
    id?: true
    dataMovimentacao?: true
    quantidade?: true
    precoVendaUnitario?: true
    tipo?: true
    lucroEstimado?: true
    destinoCliente?: true
    conferenteResponsavel?: true
    produtoId?: true
  }

  export type MovimentacaoMaxAggregateInputType = {
    id?: true
    dataMovimentacao?: true
    quantidade?: true
    precoVendaUnitario?: true
    tipo?: true
    lucroEstimado?: true
    destinoCliente?: true
    conferenteResponsavel?: true
    produtoId?: true
  }

  export type MovimentacaoCountAggregateInputType = {
    id?: true
    dataMovimentacao?: true
    quantidade?: true
    precoVendaUnitario?: true
    tipo?: true
    lucroEstimado?: true
    destinoCliente?: true
    conferenteResponsavel?: true
    produtoId?: true
    _all?: true
  }

  export type MovimentacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movimentacao to aggregate.
     */
    where?: MovimentacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movimentacaos to fetch.
     */
    orderBy?: MovimentacaoOrderByWithRelationInput | MovimentacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovimentacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movimentacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movimentacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Movimentacaos
    **/
    _count?: true | MovimentacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovimentacaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovimentacaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovimentacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovimentacaoMaxAggregateInputType
  }

  export type GetMovimentacaoAggregateType<T extends MovimentacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateMovimentacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovimentacao[P]>
      : GetScalarType<T[P], AggregateMovimentacao[P]>
  }




  export type MovimentacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovimentacaoWhereInput
    orderBy?: MovimentacaoOrderByWithAggregationInput | MovimentacaoOrderByWithAggregationInput[]
    by: MovimentacaoScalarFieldEnum[] | MovimentacaoScalarFieldEnum
    having?: MovimentacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovimentacaoCountAggregateInputType | true
    _avg?: MovimentacaoAvgAggregateInputType
    _sum?: MovimentacaoSumAggregateInputType
    _min?: MovimentacaoMinAggregateInputType
    _max?: MovimentacaoMaxAggregateInputType
  }

  export type MovimentacaoGroupByOutputType = {
    id: number
    dataMovimentacao: Date
    quantidade: number
    precoVendaUnitario: Decimal
    tipo: string
    lucroEstimado: Decimal
    destinoCliente: string
    conferenteResponsavel: string
    produtoId: number
    _count: MovimentacaoCountAggregateOutputType | null
    _avg: MovimentacaoAvgAggregateOutputType | null
    _sum: MovimentacaoSumAggregateOutputType | null
    _min: MovimentacaoMinAggregateOutputType | null
    _max: MovimentacaoMaxAggregateOutputType | null
  }

  type GetMovimentacaoGroupByPayload<T extends MovimentacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovimentacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovimentacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovimentacaoGroupByOutputType[P]>
            : GetScalarType<T[P], MovimentacaoGroupByOutputType[P]>
        }
      >
    >


  export type MovimentacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataMovimentacao?: boolean
    quantidade?: boolean
    precoVendaUnitario?: boolean
    tipo?: boolean
    lucroEstimado?: boolean
    destinoCliente?: boolean
    conferenteResponsavel?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movimentacao"]>

  export type MovimentacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataMovimentacao?: boolean
    quantidade?: boolean
    precoVendaUnitario?: boolean
    tipo?: boolean
    lucroEstimado?: boolean
    destinoCliente?: boolean
    conferenteResponsavel?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movimentacao"]>

  export type MovimentacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataMovimentacao?: boolean
    quantidade?: boolean
    precoVendaUnitario?: boolean
    tipo?: boolean
    lucroEstimado?: boolean
    destinoCliente?: boolean
    conferenteResponsavel?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movimentacao"]>

  export type MovimentacaoSelectScalar = {
    id?: boolean
    dataMovimentacao?: boolean
    quantidade?: boolean
    precoVendaUnitario?: boolean
    tipo?: boolean
    lucroEstimado?: boolean
    destinoCliente?: boolean
    conferenteResponsavel?: boolean
    produtoId?: boolean
  }

  export type MovimentacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dataMovimentacao" | "quantidade" | "precoVendaUnitario" | "tipo" | "lucroEstimado" | "destinoCliente" | "conferenteResponsavel" | "produtoId", ExtArgs["result"]["movimentacao"]>
  export type MovimentacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type MovimentacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type MovimentacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }

  export type $MovimentacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Movimentacao"
    objects: {
      produto: Prisma.$ProdutoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dataMovimentacao: Date
      quantidade: number
      precoVendaUnitario: Prisma.Decimal
      tipo: string
      lucroEstimado: Prisma.Decimal
      destinoCliente: string
      conferenteResponsavel: string
      produtoId: number
    }, ExtArgs["result"]["movimentacao"]>
    composites: {}
  }

  type MovimentacaoGetPayload<S extends boolean | null | undefined | MovimentacaoDefaultArgs> = $Result.GetResult<Prisma.$MovimentacaoPayload, S>

  type MovimentacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovimentacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovimentacaoCountAggregateInputType | true
    }

  export interface MovimentacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Movimentacao'], meta: { name: 'Movimentacao' } }
    /**
     * Find zero or one Movimentacao that matches the filter.
     * @param {MovimentacaoFindUniqueArgs} args - Arguments to find a Movimentacao
     * @example
     * // Get one Movimentacao
     * const movimentacao = await prisma.movimentacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovimentacaoFindUniqueArgs>(args: SelectSubset<T, MovimentacaoFindUniqueArgs<ExtArgs>>): Prisma__MovimentacaoClient<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Movimentacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovimentacaoFindUniqueOrThrowArgs} args - Arguments to find a Movimentacao
     * @example
     * // Get one Movimentacao
     * const movimentacao = await prisma.movimentacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovimentacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, MovimentacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovimentacaoClient<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movimentacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimentacaoFindFirstArgs} args - Arguments to find a Movimentacao
     * @example
     * // Get one Movimentacao
     * const movimentacao = await prisma.movimentacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovimentacaoFindFirstArgs>(args?: SelectSubset<T, MovimentacaoFindFirstArgs<ExtArgs>>): Prisma__MovimentacaoClient<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movimentacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimentacaoFindFirstOrThrowArgs} args - Arguments to find a Movimentacao
     * @example
     * // Get one Movimentacao
     * const movimentacao = await prisma.movimentacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovimentacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, MovimentacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovimentacaoClient<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Movimentacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimentacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movimentacaos
     * const movimentacaos = await prisma.movimentacao.findMany()
     * 
     * // Get first 10 Movimentacaos
     * const movimentacaos = await prisma.movimentacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movimentacaoWithIdOnly = await prisma.movimentacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MovimentacaoFindManyArgs>(args?: SelectSubset<T, MovimentacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Movimentacao.
     * @param {MovimentacaoCreateArgs} args - Arguments to create a Movimentacao.
     * @example
     * // Create one Movimentacao
     * const Movimentacao = await prisma.movimentacao.create({
     *   data: {
     *     // ... data to create a Movimentacao
     *   }
     * })
     * 
     */
    create<T extends MovimentacaoCreateArgs>(args: SelectSubset<T, MovimentacaoCreateArgs<ExtArgs>>): Prisma__MovimentacaoClient<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Movimentacaos.
     * @param {MovimentacaoCreateManyArgs} args - Arguments to create many Movimentacaos.
     * @example
     * // Create many Movimentacaos
     * const movimentacao = await prisma.movimentacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovimentacaoCreateManyArgs>(args?: SelectSubset<T, MovimentacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movimentacaos and returns the data saved in the database.
     * @param {MovimentacaoCreateManyAndReturnArgs} args - Arguments to create many Movimentacaos.
     * @example
     * // Create many Movimentacaos
     * const movimentacao = await prisma.movimentacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movimentacaos and only return the `id`
     * const movimentacaoWithIdOnly = await prisma.movimentacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovimentacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, MovimentacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Movimentacao.
     * @param {MovimentacaoDeleteArgs} args - Arguments to delete one Movimentacao.
     * @example
     * // Delete one Movimentacao
     * const Movimentacao = await prisma.movimentacao.delete({
     *   where: {
     *     // ... filter to delete one Movimentacao
     *   }
     * })
     * 
     */
    delete<T extends MovimentacaoDeleteArgs>(args: SelectSubset<T, MovimentacaoDeleteArgs<ExtArgs>>): Prisma__MovimentacaoClient<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Movimentacao.
     * @param {MovimentacaoUpdateArgs} args - Arguments to update one Movimentacao.
     * @example
     * // Update one Movimentacao
     * const movimentacao = await prisma.movimentacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovimentacaoUpdateArgs>(args: SelectSubset<T, MovimentacaoUpdateArgs<ExtArgs>>): Prisma__MovimentacaoClient<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Movimentacaos.
     * @param {MovimentacaoDeleteManyArgs} args - Arguments to filter Movimentacaos to delete.
     * @example
     * // Delete a few Movimentacaos
     * const { count } = await prisma.movimentacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovimentacaoDeleteManyArgs>(args?: SelectSubset<T, MovimentacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movimentacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimentacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movimentacaos
     * const movimentacao = await prisma.movimentacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovimentacaoUpdateManyArgs>(args: SelectSubset<T, MovimentacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movimentacaos and returns the data updated in the database.
     * @param {MovimentacaoUpdateManyAndReturnArgs} args - Arguments to update many Movimentacaos.
     * @example
     * // Update many Movimentacaos
     * const movimentacao = await prisma.movimentacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Movimentacaos and only return the `id`
     * const movimentacaoWithIdOnly = await prisma.movimentacao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovimentacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, MovimentacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Movimentacao.
     * @param {MovimentacaoUpsertArgs} args - Arguments to update or create a Movimentacao.
     * @example
     * // Update or create a Movimentacao
     * const movimentacao = await prisma.movimentacao.upsert({
     *   create: {
     *     // ... data to create a Movimentacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movimentacao we want to update
     *   }
     * })
     */
    upsert<T extends MovimentacaoUpsertArgs>(args: SelectSubset<T, MovimentacaoUpsertArgs<ExtArgs>>): Prisma__MovimentacaoClient<$Result.GetResult<Prisma.$MovimentacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Movimentacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimentacaoCountArgs} args - Arguments to filter Movimentacaos to count.
     * @example
     * // Count the number of Movimentacaos
     * const count = await prisma.movimentacao.count({
     *   where: {
     *     // ... the filter for the Movimentacaos we want to count
     *   }
     * })
    **/
    count<T extends MovimentacaoCountArgs>(
      args?: Subset<T, MovimentacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovimentacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movimentacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimentacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovimentacaoAggregateArgs>(args: Subset<T, MovimentacaoAggregateArgs>): Prisma.PrismaPromise<GetMovimentacaoAggregateType<T>>

    /**
     * Group by Movimentacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimentacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovimentacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovimentacaoGroupByArgs['orderBy'] }
        : { orderBy?: MovimentacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovimentacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovimentacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Movimentacao model
   */
  readonly fields: MovimentacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Movimentacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovimentacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Movimentacao model
   */
  interface MovimentacaoFieldRefs {
    readonly id: FieldRef<"Movimentacao", 'Int'>
    readonly dataMovimentacao: FieldRef<"Movimentacao", 'DateTime'>
    readonly quantidade: FieldRef<"Movimentacao", 'Int'>
    readonly precoVendaUnitario: FieldRef<"Movimentacao", 'Decimal'>
    readonly tipo: FieldRef<"Movimentacao", 'String'>
    readonly lucroEstimado: FieldRef<"Movimentacao", 'Decimal'>
    readonly destinoCliente: FieldRef<"Movimentacao", 'String'>
    readonly conferenteResponsavel: FieldRef<"Movimentacao", 'String'>
    readonly produtoId: FieldRef<"Movimentacao", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Movimentacao findUnique
   */
  export type MovimentacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which Movimentacao to fetch.
     */
    where: MovimentacaoWhereUniqueInput
  }

  /**
   * Movimentacao findUniqueOrThrow
   */
  export type MovimentacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which Movimentacao to fetch.
     */
    where: MovimentacaoWhereUniqueInput
  }

  /**
   * Movimentacao findFirst
   */
  export type MovimentacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which Movimentacao to fetch.
     */
    where?: MovimentacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movimentacaos to fetch.
     */
    orderBy?: MovimentacaoOrderByWithRelationInput | MovimentacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movimentacaos.
     */
    cursor?: MovimentacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movimentacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movimentacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movimentacaos.
     */
    distinct?: MovimentacaoScalarFieldEnum | MovimentacaoScalarFieldEnum[]
  }

  /**
   * Movimentacao findFirstOrThrow
   */
  export type MovimentacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which Movimentacao to fetch.
     */
    where?: MovimentacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movimentacaos to fetch.
     */
    orderBy?: MovimentacaoOrderByWithRelationInput | MovimentacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movimentacaos.
     */
    cursor?: MovimentacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movimentacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movimentacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movimentacaos.
     */
    distinct?: MovimentacaoScalarFieldEnum | MovimentacaoScalarFieldEnum[]
  }

  /**
   * Movimentacao findMany
   */
  export type MovimentacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    /**
     * Filter, which Movimentacaos to fetch.
     */
    where?: MovimentacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movimentacaos to fetch.
     */
    orderBy?: MovimentacaoOrderByWithRelationInput | MovimentacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Movimentacaos.
     */
    cursor?: MovimentacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movimentacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movimentacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movimentacaos.
     */
    distinct?: MovimentacaoScalarFieldEnum | MovimentacaoScalarFieldEnum[]
  }

  /**
   * Movimentacao create
   */
  export type MovimentacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Movimentacao.
     */
    data: XOR<MovimentacaoCreateInput, MovimentacaoUncheckedCreateInput>
  }

  /**
   * Movimentacao createMany
   */
  export type MovimentacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Movimentacaos.
     */
    data: MovimentacaoCreateManyInput | MovimentacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Movimentacao createManyAndReturn
   */
  export type MovimentacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Movimentacaos.
     */
    data: MovimentacaoCreateManyInput | MovimentacaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Movimentacao update
   */
  export type MovimentacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Movimentacao.
     */
    data: XOR<MovimentacaoUpdateInput, MovimentacaoUncheckedUpdateInput>
    /**
     * Choose, which Movimentacao to update.
     */
    where: MovimentacaoWhereUniqueInput
  }

  /**
   * Movimentacao updateMany
   */
  export type MovimentacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Movimentacaos.
     */
    data: XOR<MovimentacaoUpdateManyMutationInput, MovimentacaoUncheckedUpdateManyInput>
    /**
     * Filter which Movimentacaos to update
     */
    where?: MovimentacaoWhereInput
    /**
     * Limit how many Movimentacaos to update.
     */
    limit?: number
  }

  /**
   * Movimentacao updateManyAndReturn
   */
  export type MovimentacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * The data used to update Movimentacaos.
     */
    data: XOR<MovimentacaoUpdateManyMutationInput, MovimentacaoUncheckedUpdateManyInput>
    /**
     * Filter which Movimentacaos to update
     */
    where?: MovimentacaoWhereInput
    /**
     * Limit how many Movimentacaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Movimentacao upsert
   */
  export type MovimentacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Movimentacao to update in case it exists.
     */
    where: MovimentacaoWhereUniqueInput
    /**
     * In case the Movimentacao found by the `where` argument doesn't exist, create a new Movimentacao with this data.
     */
    create: XOR<MovimentacaoCreateInput, MovimentacaoUncheckedCreateInput>
    /**
     * In case the Movimentacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovimentacaoUpdateInput, MovimentacaoUncheckedUpdateInput>
  }

  /**
   * Movimentacao delete
   */
  export type MovimentacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
    /**
     * Filter which Movimentacao to delete.
     */
    where: MovimentacaoWhereUniqueInput
  }

  /**
   * Movimentacao deleteMany
   */
  export type MovimentacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movimentacaos to delete
     */
    where?: MovimentacaoWhereInput
    /**
     * Limit how many Movimentacaos to delete.
     */
    limit?: number
  }

  /**
   * Movimentacao without action
   */
  export type MovimentacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movimentacao
     */
    select?: MovimentacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movimentacao
     */
    omit?: MovimentacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimentacaoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CategoriaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    createdAt: 'createdAt'
  };

  export type CategoriaScalarFieldEnum = (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum]


  export const ProdutoScalarFieldEnum: {
    id: 'id',
    dataCadastro: 'dataCadastro',
    nome: 'nome',
    unidadesPorPack: 'unidadesPorPack',
    qtdAtual: 'qtdAtual',
    qtdMinima: 'qtdMinima',
    qtdMaxima: 'qtdMaxima',
    custoDeCompra: 'custoDeCompra',
    precoDeVenda: 'precoDeVenda',
    categoriaId: 'categoriaId'
  };

  export type ProdutoScalarFieldEnum = (typeof ProdutoScalarFieldEnum)[keyof typeof ProdutoScalarFieldEnum]


  export const MovimentacaoScalarFieldEnum: {
    id: 'id',
    dataMovimentacao: 'dataMovimentacao',
    quantidade: 'quantidade',
    precoVendaUnitario: 'precoVendaUnitario',
    tipo: 'tipo',
    lucroEstimado: 'lucroEstimado',
    destinoCliente: 'destinoCliente',
    conferenteResponsavel: 'conferenteResponsavel',
    produtoId: 'produtoId'
  };

  export type MovimentacaoScalarFieldEnum = (typeof MovimentacaoScalarFieldEnum)[keyof typeof MovimentacaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CategoriaWhereInput = {
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    id?: IntFilter<"Categoria"> | number
    nome?: StringFilter<"Categoria"> | string
    createdAt?: DateTimeFilter<"Categoria"> | Date | string
    produtos?: ProdutoListRelationFilter
  }

  export type CategoriaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    createdAt?: SortOrder
    produtos?: ProdutoOrderByRelationAggregateInput
  }

  export type CategoriaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nome?: string
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    createdAt?: DateTimeFilter<"Categoria"> | Date | string
    produtos?: ProdutoListRelationFilter
  }, "id" | "nome">

  export type CategoriaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    createdAt?: SortOrder
    _count?: CategoriaCountOrderByAggregateInput
    _avg?: CategoriaAvgOrderByAggregateInput
    _max?: CategoriaMaxOrderByAggregateInput
    _min?: CategoriaMinOrderByAggregateInput
    _sum?: CategoriaSumOrderByAggregateInput
  }

  export type CategoriaScalarWhereWithAggregatesInput = {
    AND?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    OR?: CategoriaScalarWhereWithAggregatesInput[]
    NOT?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Categoria"> | number
    nome?: StringWithAggregatesFilter<"Categoria"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Categoria"> | Date | string
  }

  export type ProdutoWhereInput = {
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    id?: IntFilter<"Produto"> | number
    dataCadastro?: DateTimeFilter<"Produto"> | Date | string
    nome?: StringFilter<"Produto"> | string
    unidadesPorPack?: IntFilter<"Produto"> | number
    qtdAtual?: IntFilter<"Produto"> | number
    qtdMinima?: IntFilter<"Produto"> | number
    qtdMaxima?: IntFilter<"Produto"> | number
    custoDeCompra?: DecimalFilter<"Produto"> | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFilter<"Produto"> | Decimal | DecimalJsLike | number | string
    categoriaId?: IntFilter<"Produto"> | number
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    movimentacoes?: MovimentacaoListRelationFilter
  }

  export type ProdutoOrderByWithRelationInput = {
    id?: SortOrder
    dataCadastro?: SortOrder
    nome?: SortOrder
    unidadesPorPack?: SortOrder
    qtdAtual?: SortOrder
    qtdMinima?: SortOrder
    qtdMaxima?: SortOrder
    custoDeCompra?: SortOrder
    precoDeVenda?: SortOrder
    categoriaId?: SortOrder
    categoria?: CategoriaOrderByWithRelationInput
    movimentacoes?: MovimentacaoOrderByRelationAggregateInput
  }

  export type ProdutoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    dataCadastro?: DateTimeFilter<"Produto"> | Date | string
    nome?: StringFilter<"Produto"> | string
    unidadesPorPack?: IntFilter<"Produto"> | number
    qtdAtual?: IntFilter<"Produto"> | number
    qtdMinima?: IntFilter<"Produto"> | number
    qtdMaxima?: IntFilter<"Produto"> | number
    custoDeCompra?: DecimalFilter<"Produto"> | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFilter<"Produto"> | Decimal | DecimalJsLike | number | string
    categoriaId?: IntFilter<"Produto"> | number
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    movimentacoes?: MovimentacaoListRelationFilter
  }, "id">

  export type ProdutoOrderByWithAggregationInput = {
    id?: SortOrder
    dataCadastro?: SortOrder
    nome?: SortOrder
    unidadesPorPack?: SortOrder
    qtdAtual?: SortOrder
    qtdMinima?: SortOrder
    qtdMaxima?: SortOrder
    custoDeCompra?: SortOrder
    precoDeVenda?: SortOrder
    categoriaId?: SortOrder
    _count?: ProdutoCountOrderByAggregateInput
    _avg?: ProdutoAvgOrderByAggregateInput
    _max?: ProdutoMaxOrderByAggregateInput
    _min?: ProdutoMinOrderByAggregateInput
    _sum?: ProdutoSumOrderByAggregateInput
  }

  export type ProdutoScalarWhereWithAggregatesInput = {
    AND?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    OR?: ProdutoScalarWhereWithAggregatesInput[]
    NOT?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Produto"> | number
    dataCadastro?: DateTimeWithAggregatesFilter<"Produto"> | Date | string
    nome?: StringWithAggregatesFilter<"Produto"> | string
    unidadesPorPack?: IntWithAggregatesFilter<"Produto"> | number
    qtdAtual?: IntWithAggregatesFilter<"Produto"> | number
    qtdMinima?: IntWithAggregatesFilter<"Produto"> | number
    qtdMaxima?: IntWithAggregatesFilter<"Produto"> | number
    custoDeCompra?: DecimalWithAggregatesFilter<"Produto"> | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalWithAggregatesFilter<"Produto"> | Decimal | DecimalJsLike | number | string
    categoriaId?: IntWithAggregatesFilter<"Produto"> | number
  }

  export type MovimentacaoWhereInput = {
    AND?: MovimentacaoWhereInput | MovimentacaoWhereInput[]
    OR?: MovimentacaoWhereInput[]
    NOT?: MovimentacaoWhereInput | MovimentacaoWhereInput[]
    id?: IntFilter<"Movimentacao"> | number
    dataMovimentacao?: DateTimeFilter<"Movimentacao"> | Date | string
    quantidade?: IntFilter<"Movimentacao"> | number
    precoVendaUnitario?: DecimalFilter<"Movimentacao"> | Decimal | DecimalJsLike | number | string
    tipo?: StringFilter<"Movimentacao"> | string
    lucroEstimado?: DecimalFilter<"Movimentacao"> | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFilter<"Movimentacao"> | string
    conferenteResponsavel?: StringFilter<"Movimentacao"> | string
    produtoId?: IntFilter<"Movimentacao"> | number
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }

  export type MovimentacaoOrderByWithRelationInput = {
    id?: SortOrder
    dataMovimentacao?: SortOrder
    quantidade?: SortOrder
    precoVendaUnitario?: SortOrder
    tipo?: SortOrder
    lucroEstimado?: SortOrder
    destinoCliente?: SortOrder
    conferenteResponsavel?: SortOrder
    produtoId?: SortOrder
    produto?: ProdutoOrderByWithRelationInput
  }

  export type MovimentacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MovimentacaoWhereInput | MovimentacaoWhereInput[]
    OR?: MovimentacaoWhereInput[]
    NOT?: MovimentacaoWhereInput | MovimentacaoWhereInput[]
    dataMovimentacao?: DateTimeFilter<"Movimentacao"> | Date | string
    quantidade?: IntFilter<"Movimentacao"> | number
    precoVendaUnitario?: DecimalFilter<"Movimentacao"> | Decimal | DecimalJsLike | number | string
    tipo?: StringFilter<"Movimentacao"> | string
    lucroEstimado?: DecimalFilter<"Movimentacao"> | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFilter<"Movimentacao"> | string
    conferenteResponsavel?: StringFilter<"Movimentacao"> | string
    produtoId?: IntFilter<"Movimentacao"> | number
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }, "id">

  export type MovimentacaoOrderByWithAggregationInput = {
    id?: SortOrder
    dataMovimentacao?: SortOrder
    quantidade?: SortOrder
    precoVendaUnitario?: SortOrder
    tipo?: SortOrder
    lucroEstimado?: SortOrder
    destinoCliente?: SortOrder
    conferenteResponsavel?: SortOrder
    produtoId?: SortOrder
    _count?: MovimentacaoCountOrderByAggregateInput
    _avg?: MovimentacaoAvgOrderByAggregateInput
    _max?: MovimentacaoMaxOrderByAggregateInput
    _min?: MovimentacaoMinOrderByAggregateInput
    _sum?: MovimentacaoSumOrderByAggregateInput
  }

  export type MovimentacaoScalarWhereWithAggregatesInput = {
    AND?: MovimentacaoScalarWhereWithAggregatesInput | MovimentacaoScalarWhereWithAggregatesInput[]
    OR?: MovimentacaoScalarWhereWithAggregatesInput[]
    NOT?: MovimentacaoScalarWhereWithAggregatesInput | MovimentacaoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Movimentacao"> | number
    dataMovimentacao?: DateTimeWithAggregatesFilter<"Movimentacao"> | Date | string
    quantidade?: IntWithAggregatesFilter<"Movimentacao"> | number
    precoVendaUnitario?: DecimalWithAggregatesFilter<"Movimentacao"> | Decimal | DecimalJsLike | number | string
    tipo?: StringWithAggregatesFilter<"Movimentacao"> | string
    lucroEstimado?: DecimalWithAggregatesFilter<"Movimentacao"> | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringWithAggregatesFilter<"Movimentacao"> | string
    conferenteResponsavel?: StringWithAggregatesFilter<"Movimentacao"> | string
    produtoId?: IntWithAggregatesFilter<"Movimentacao"> | number
  }

  export type CategoriaCreateInput = {
    nome: string
    createdAt?: Date | string
    produtos?: ProdutoCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateInput = {
    id?: number
    nome: string
    createdAt?: Date | string
    produtos?: ProdutoUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtos?: ProdutoUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtos?: ProdutoUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaCreateManyInput = {
    id?: number
    nome: string
    createdAt?: Date | string
  }

  export type CategoriaUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProdutoCreateInput = {
    dataCadastro?: Date | string
    nome: string
    unidadesPorPack?: number
    qtdAtual?: number
    qtdMinima?: number
    qtdMaxima?: number
    custoDeCompra: Decimal | DecimalJsLike | number | string
    precoDeVenda: Decimal | DecimalJsLike | number | string
    categoria: CategoriaCreateNestedOneWithoutProdutosInput
    movimentacoes?: MovimentacaoCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateInput = {
    id?: number
    dataCadastro?: Date | string
    nome: string
    unidadesPorPack?: number
    qtdAtual?: number
    qtdMinima?: number
    qtdMaxima?: number
    custoDeCompra: Decimal | DecimalJsLike | number | string
    precoDeVenda: Decimal | DecimalJsLike | number | string
    categoriaId: number
    movimentacoes?: MovimentacaoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUpdateInput = {
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    unidadesPorPack?: IntFieldUpdateOperationsInput | number
    qtdAtual?: IntFieldUpdateOperationsInput | number
    qtdMinima?: IntFieldUpdateOperationsInput | number
    qtdMaxima?: IntFieldUpdateOperationsInput | number
    custoDeCompra?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    categoria?: CategoriaUpdateOneRequiredWithoutProdutosNestedInput
    movimentacoes?: MovimentacaoUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    unidadesPorPack?: IntFieldUpdateOperationsInput | number
    qtdAtual?: IntFieldUpdateOperationsInput | number
    qtdMinima?: IntFieldUpdateOperationsInput | number
    qtdMaxima?: IntFieldUpdateOperationsInput | number
    custoDeCompra?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    categoriaId?: IntFieldUpdateOperationsInput | number
    movimentacoes?: MovimentacaoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoCreateManyInput = {
    id?: number
    dataCadastro?: Date | string
    nome: string
    unidadesPorPack?: number
    qtdAtual?: number
    qtdMinima?: number
    qtdMaxima?: number
    custoDeCompra: Decimal | DecimalJsLike | number | string
    precoDeVenda: Decimal | DecimalJsLike | number | string
    categoriaId: number
  }

  export type ProdutoUpdateManyMutationInput = {
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    unidadesPorPack?: IntFieldUpdateOperationsInput | number
    qtdAtual?: IntFieldUpdateOperationsInput | number
    qtdMinima?: IntFieldUpdateOperationsInput | number
    qtdMaxima?: IntFieldUpdateOperationsInput | number
    custoDeCompra?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ProdutoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    unidadesPorPack?: IntFieldUpdateOperationsInput | number
    qtdAtual?: IntFieldUpdateOperationsInput | number
    qtdMinima?: IntFieldUpdateOperationsInput | number
    qtdMaxima?: IntFieldUpdateOperationsInput | number
    custoDeCompra?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    categoriaId?: IntFieldUpdateOperationsInput | number
  }

  export type MovimentacaoCreateInput = {
    dataMovimentacao?: Date | string
    quantidade: number
    precoVendaUnitario: Decimal | DecimalJsLike | number | string
    tipo: string
    lucroEstimado: Decimal | DecimalJsLike | number | string
    destinoCliente: string
    conferenteResponsavel: string
    produto: ProdutoCreateNestedOneWithoutMovimentacoesInput
  }

  export type MovimentacaoUncheckedCreateInput = {
    id?: number
    dataMovimentacao?: Date | string
    quantidade: number
    precoVendaUnitario: Decimal | DecimalJsLike | number | string
    tipo: string
    lucroEstimado: Decimal | DecimalJsLike | number | string
    destinoCliente: string
    conferenteResponsavel: string
    produtoId: number
  }

  export type MovimentacaoUpdateInput = {
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoVendaUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    lucroEstimado?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFieldUpdateOperationsInput | string
    conferenteResponsavel?: StringFieldUpdateOperationsInput | string
    produto?: ProdutoUpdateOneRequiredWithoutMovimentacoesNestedInput
  }

  export type MovimentacaoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoVendaUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    lucroEstimado?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFieldUpdateOperationsInput | string
    conferenteResponsavel?: StringFieldUpdateOperationsInput | string
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type MovimentacaoCreateManyInput = {
    id?: number
    dataMovimentacao?: Date | string
    quantidade: number
    precoVendaUnitario: Decimal | DecimalJsLike | number | string
    tipo: string
    lucroEstimado: Decimal | DecimalJsLike | number | string
    destinoCliente: string
    conferenteResponsavel: string
    produtoId: number
  }

  export type MovimentacaoUpdateManyMutationInput = {
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoVendaUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    lucroEstimado?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFieldUpdateOperationsInput | string
    conferenteResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type MovimentacaoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoVendaUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    lucroEstimado?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFieldUpdateOperationsInput | string
    conferenteResponsavel?: StringFieldUpdateOperationsInput | string
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProdutoListRelationFilter = {
    every?: ProdutoWhereInput
    some?: ProdutoWhereInput
    none?: ProdutoWhereInput
  }

  export type ProdutoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoriaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoriaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoriaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoriaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoriaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CategoriaScalarRelationFilter = {
    is?: CategoriaWhereInput
    isNot?: CategoriaWhereInput
  }

  export type MovimentacaoListRelationFilter = {
    every?: MovimentacaoWhereInput
    some?: MovimentacaoWhereInput
    none?: MovimentacaoWhereInput
  }

  export type MovimentacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProdutoCountOrderByAggregateInput = {
    id?: SortOrder
    dataCadastro?: SortOrder
    nome?: SortOrder
    unidadesPorPack?: SortOrder
    qtdAtual?: SortOrder
    qtdMinima?: SortOrder
    qtdMaxima?: SortOrder
    custoDeCompra?: SortOrder
    precoDeVenda?: SortOrder
    categoriaId?: SortOrder
  }

  export type ProdutoAvgOrderByAggregateInput = {
    id?: SortOrder
    unidadesPorPack?: SortOrder
    qtdAtual?: SortOrder
    qtdMinima?: SortOrder
    qtdMaxima?: SortOrder
    custoDeCompra?: SortOrder
    precoDeVenda?: SortOrder
    categoriaId?: SortOrder
  }

  export type ProdutoMaxOrderByAggregateInput = {
    id?: SortOrder
    dataCadastro?: SortOrder
    nome?: SortOrder
    unidadesPorPack?: SortOrder
    qtdAtual?: SortOrder
    qtdMinima?: SortOrder
    qtdMaxima?: SortOrder
    custoDeCompra?: SortOrder
    precoDeVenda?: SortOrder
    categoriaId?: SortOrder
  }

  export type ProdutoMinOrderByAggregateInput = {
    id?: SortOrder
    dataCadastro?: SortOrder
    nome?: SortOrder
    unidadesPorPack?: SortOrder
    qtdAtual?: SortOrder
    qtdMinima?: SortOrder
    qtdMaxima?: SortOrder
    custoDeCompra?: SortOrder
    precoDeVenda?: SortOrder
    categoriaId?: SortOrder
  }

  export type ProdutoSumOrderByAggregateInput = {
    id?: SortOrder
    unidadesPorPack?: SortOrder
    qtdAtual?: SortOrder
    qtdMinima?: SortOrder
    qtdMaxima?: SortOrder
    custoDeCompra?: SortOrder
    precoDeVenda?: SortOrder
    categoriaId?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ProdutoScalarRelationFilter = {
    is?: ProdutoWhereInput
    isNot?: ProdutoWhereInput
  }

  export type MovimentacaoCountOrderByAggregateInput = {
    id?: SortOrder
    dataMovimentacao?: SortOrder
    quantidade?: SortOrder
    precoVendaUnitario?: SortOrder
    tipo?: SortOrder
    lucroEstimado?: SortOrder
    destinoCliente?: SortOrder
    conferenteResponsavel?: SortOrder
    produtoId?: SortOrder
  }

  export type MovimentacaoAvgOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    precoVendaUnitario?: SortOrder
    lucroEstimado?: SortOrder
    produtoId?: SortOrder
  }

  export type MovimentacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    dataMovimentacao?: SortOrder
    quantidade?: SortOrder
    precoVendaUnitario?: SortOrder
    tipo?: SortOrder
    lucroEstimado?: SortOrder
    destinoCliente?: SortOrder
    conferenteResponsavel?: SortOrder
    produtoId?: SortOrder
  }

  export type MovimentacaoMinOrderByAggregateInput = {
    id?: SortOrder
    dataMovimentacao?: SortOrder
    quantidade?: SortOrder
    precoVendaUnitario?: SortOrder
    tipo?: SortOrder
    lucroEstimado?: SortOrder
    destinoCliente?: SortOrder
    conferenteResponsavel?: SortOrder
    produtoId?: SortOrder
  }

  export type MovimentacaoSumOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    precoVendaUnitario?: SortOrder
    lucroEstimado?: SortOrder
    produtoId?: SortOrder
  }

  export type ProdutoCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProdutoCreateWithoutCategoriaInput, ProdutoUncheckedCreateWithoutCategoriaInput> | ProdutoCreateWithoutCategoriaInput[] | ProdutoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutCategoriaInput | ProdutoCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProdutoCreateManyCategoriaInputEnvelope
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
  }

  export type ProdutoUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProdutoCreateWithoutCategoriaInput, ProdutoUncheckedCreateWithoutCategoriaInput> | ProdutoCreateWithoutCategoriaInput[] | ProdutoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutCategoriaInput | ProdutoCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProdutoCreateManyCategoriaInputEnvelope
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProdutoUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProdutoCreateWithoutCategoriaInput, ProdutoUncheckedCreateWithoutCategoriaInput> | ProdutoCreateWithoutCategoriaInput[] | ProdutoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutCategoriaInput | ProdutoCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProdutoUpsertWithWhereUniqueWithoutCategoriaInput | ProdutoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProdutoCreateManyCategoriaInputEnvelope
    set?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    disconnect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    delete?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    update?: ProdutoUpdateWithWhereUniqueWithoutCategoriaInput | ProdutoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProdutoUpdateManyWithWhereWithoutCategoriaInput | ProdutoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProdutoUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProdutoCreateWithoutCategoriaInput, ProdutoUncheckedCreateWithoutCategoriaInput> | ProdutoCreateWithoutCategoriaInput[] | ProdutoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutCategoriaInput | ProdutoCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProdutoUpsertWithWhereUniqueWithoutCategoriaInput | ProdutoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProdutoCreateManyCategoriaInputEnvelope
    set?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    disconnect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    delete?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    update?: ProdutoUpdateWithWhereUniqueWithoutCategoriaInput | ProdutoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProdutoUpdateManyWithWhereWithoutCategoriaInput | ProdutoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
  }

  export type CategoriaCreateNestedOneWithoutProdutosInput = {
    create?: XOR<CategoriaCreateWithoutProdutosInput, CategoriaUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProdutosInput
    connect?: CategoriaWhereUniqueInput
  }

  export type MovimentacaoCreateNestedManyWithoutProdutoInput = {
    create?: XOR<MovimentacaoCreateWithoutProdutoInput, MovimentacaoUncheckedCreateWithoutProdutoInput> | MovimentacaoCreateWithoutProdutoInput[] | MovimentacaoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: MovimentacaoCreateOrConnectWithoutProdutoInput | MovimentacaoCreateOrConnectWithoutProdutoInput[]
    createMany?: MovimentacaoCreateManyProdutoInputEnvelope
    connect?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
  }

  export type MovimentacaoUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<MovimentacaoCreateWithoutProdutoInput, MovimentacaoUncheckedCreateWithoutProdutoInput> | MovimentacaoCreateWithoutProdutoInput[] | MovimentacaoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: MovimentacaoCreateOrConnectWithoutProdutoInput | MovimentacaoCreateOrConnectWithoutProdutoInput[]
    createMany?: MovimentacaoCreateManyProdutoInputEnvelope
    connect?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CategoriaUpdateOneRequiredWithoutProdutosNestedInput = {
    create?: XOR<CategoriaCreateWithoutProdutosInput, CategoriaUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProdutosInput
    upsert?: CategoriaUpsertWithoutProdutosInput
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutProdutosInput, CategoriaUpdateWithoutProdutosInput>, CategoriaUncheckedUpdateWithoutProdutosInput>
  }

  export type MovimentacaoUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<MovimentacaoCreateWithoutProdutoInput, MovimentacaoUncheckedCreateWithoutProdutoInput> | MovimentacaoCreateWithoutProdutoInput[] | MovimentacaoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: MovimentacaoCreateOrConnectWithoutProdutoInput | MovimentacaoCreateOrConnectWithoutProdutoInput[]
    upsert?: MovimentacaoUpsertWithWhereUniqueWithoutProdutoInput | MovimentacaoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: MovimentacaoCreateManyProdutoInputEnvelope
    set?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
    disconnect?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
    delete?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
    connect?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
    update?: MovimentacaoUpdateWithWhereUniqueWithoutProdutoInput | MovimentacaoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: MovimentacaoUpdateManyWithWhereWithoutProdutoInput | MovimentacaoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: MovimentacaoScalarWhereInput | MovimentacaoScalarWhereInput[]
  }

  export type MovimentacaoUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<MovimentacaoCreateWithoutProdutoInput, MovimentacaoUncheckedCreateWithoutProdutoInput> | MovimentacaoCreateWithoutProdutoInput[] | MovimentacaoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: MovimentacaoCreateOrConnectWithoutProdutoInput | MovimentacaoCreateOrConnectWithoutProdutoInput[]
    upsert?: MovimentacaoUpsertWithWhereUniqueWithoutProdutoInput | MovimentacaoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: MovimentacaoCreateManyProdutoInputEnvelope
    set?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
    disconnect?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
    delete?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
    connect?: MovimentacaoWhereUniqueInput | MovimentacaoWhereUniqueInput[]
    update?: MovimentacaoUpdateWithWhereUniqueWithoutProdutoInput | MovimentacaoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: MovimentacaoUpdateManyWithWhereWithoutProdutoInput | MovimentacaoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: MovimentacaoScalarWhereInput | MovimentacaoScalarWhereInput[]
  }

  export type ProdutoCreateNestedOneWithoutMovimentacoesInput = {
    create?: XOR<ProdutoCreateWithoutMovimentacoesInput, ProdutoUncheckedCreateWithoutMovimentacoesInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutMovimentacoesInput
    connect?: ProdutoWhereUniqueInput
  }

  export type ProdutoUpdateOneRequiredWithoutMovimentacoesNestedInput = {
    create?: XOR<ProdutoCreateWithoutMovimentacoesInput, ProdutoUncheckedCreateWithoutMovimentacoesInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutMovimentacoesInput
    upsert?: ProdutoUpsertWithoutMovimentacoesInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutMovimentacoesInput, ProdutoUpdateWithoutMovimentacoesInput>, ProdutoUncheckedUpdateWithoutMovimentacoesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ProdutoCreateWithoutCategoriaInput = {
    dataCadastro?: Date | string
    nome: string
    unidadesPorPack?: number
    qtdAtual?: number
    qtdMinima?: number
    qtdMaxima?: number
    custoDeCompra: Decimal | DecimalJsLike | number | string
    precoDeVenda: Decimal | DecimalJsLike | number | string
    movimentacoes?: MovimentacaoCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutCategoriaInput = {
    id?: number
    dataCadastro?: Date | string
    nome: string
    unidadesPorPack?: number
    qtdAtual?: number
    qtdMinima?: number
    qtdMaxima?: number
    custoDeCompra: Decimal | DecimalJsLike | number | string
    precoDeVenda: Decimal | DecimalJsLike | number | string
    movimentacoes?: MovimentacaoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutCategoriaInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutCategoriaInput, ProdutoUncheckedCreateWithoutCategoriaInput>
  }

  export type ProdutoCreateManyCategoriaInputEnvelope = {
    data: ProdutoCreateManyCategoriaInput | ProdutoCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type ProdutoUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: ProdutoWhereUniqueInput
    update: XOR<ProdutoUpdateWithoutCategoriaInput, ProdutoUncheckedUpdateWithoutCategoriaInput>
    create: XOR<ProdutoCreateWithoutCategoriaInput, ProdutoUncheckedCreateWithoutCategoriaInput>
  }

  export type ProdutoUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: ProdutoWhereUniqueInput
    data: XOR<ProdutoUpdateWithoutCategoriaInput, ProdutoUncheckedUpdateWithoutCategoriaInput>
  }

  export type ProdutoUpdateManyWithWhereWithoutCategoriaInput = {
    where: ProdutoScalarWhereInput
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type ProdutoScalarWhereInput = {
    AND?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
    OR?: ProdutoScalarWhereInput[]
    NOT?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
    id?: IntFilter<"Produto"> | number
    dataCadastro?: DateTimeFilter<"Produto"> | Date | string
    nome?: StringFilter<"Produto"> | string
    unidadesPorPack?: IntFilter<"Produto"> | number
    qtdAtual?: IntFilter<"Produto"> | number
    qtdMinima?: IntFilter<"Produto"> | number
    qtdMaxima?: IntFilter<"Produto"> | number
    custoDeCompra?: DecimalFilter<"Produto"> | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFilter<"Produto"> | Decimal | DecimalJsLike | number | string
    categoriaId?: IntFilter<"Produto"> | number
  }

  export type CategoriaCreateWithoutProdutosInput = {
    nome: string
    createdAt?: Date | string
  }

  export type CategoriaUncheckedCreateWithoutProdutosInput = {
    id?: number
    nome: string
    createdAt?: Date | string
  }

  export type CategoriaCreateOrConnectWithoutProdutosInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutProdutosInput, CategoriaUncheckedCreateWithoutProdutosInput>
  }

  export type MovimentacaoCreateWithoutProdutoInput = {
    dataMovimentacao?: Date | string
    quantidade: number
    precoVendaUnitario: Decimal | DecimalJsLike | number | string
    tipo: string
    lucroEstimado: Decimal | DecimalJsLike | number | string
    destinoCliente: string
    conferenteResponsavel: string
  }

  export type MovimentacaoUncheckedCreateWithoutProdutoInput = {
    id?: number
    dataMovimentacao?: Date | string
    quantidade: number
    precoVendaUnitario: Decimal | DecimalJsLike | number | string
    tipo: string
    lucroEstimado: Decimal | DecimalJsLike | number | string
    destinoCliente: string
    conferenteResponsavel: string
  }

  export type MovimentacaoCreateOrConnectWithoutProdutoInput = {
    where: MovimentacaoWhereUniqueInput
    create: XOR<MovimentacaoCreateWithoutProdutoInput, MovimentacaoUncheckedCreateWithoutProdutoInput>
  }

  export type MovimentacaoCreateManyProdutoInputEnvelope = {
    data: MovimentacaoCreateManyProdutoInput | MovimentacaoCreateManyProdutoInput[]
    skipDuplicates?: boolean
  }

  export type CategoriaUpsertWithoutProdutosInput = {
    update: XOR<CategoriaUpdateWithoutProdutosInput, CategoriaUncheckedUpdateWithoutProdutosInput>
    create: XOR<CategoriaCreateWithoutProdutosInput, CategoriaUncheckedCreateWithoutProdutosInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutProdutosInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutProdutosInput, CategoriaUncheckedUpdateWithoutProdutosInput>
  }

  export type CategoriaUpdateWithoutProdutosInput = {
    nome?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUncheckedUpdateWithoutProdutosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimentacaoUpsertWithWhereUniqueWithoutProdutoInput = {
    where: MovimentacaoWhereUniqueInput
    update: XOR<MovimentacaoUpdateWithoutProdutoInput, MovimentacaoUncheckedUpdateWithoutProdutoInput>
    create: XOR<MovimentacaoCreateWithoutProdutoInput, MovimentacaoUncheckedCreateWithoutProdutoInput>
  }

  export type MovimentacaoUpdateWithWhereUniqueWithoutProdutoInput = {
    where: MovimentacaoWhereUniqueInput
    data: XOR<MovimentacaoUpdateWithoutProdutoInput, MovimentacaoUncheckedUpdateWithoutProdutoInput>
  }

  export type MovimentacaoUpdateManyWithWhereWithoutProdutoInput = {
    where: MovimentacaoScalarWhereInput
    data: XOR<MovimentacaoUpdateManyMutationInput, MovimentacaoUncheckedUpdateManyWithoutProdutoInput>
  }

  export type MovimentacaoScalarWhereInput = {
    AND?: MovimentacaoScalarWhereInput | MovimentacaoScalarWhereInput[]
    OR?: MovimentacaoScalarWhereInput[]
    NOT?: MovimentacaoScalarWhereInput | MovimentacaoScalarWhereInput[]
    id?: IntFilter<"Movimentacao"> | number
    dataMovimentacao?: DateTimeFilter<"Movimentacao"> | Date | string
    quantidade?: IntFilter<"Movimentacao"> | number
    precoVendaUnitario?: DecimalFilter<"Movimentacao"> | Decimal | DecimalJsLike | number | string
    tipo?: StringFilter<"Movimentacao"> | string
    lucroEstimado?: DecimalFilter<"Movimentacao"> | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFilter<"Movimentacao"> | string
    conferenteResponsavel?: StringFilter<"Movimentacao"> | string
    produtoId?: IntFilter<"Movimentacao"> | number
  }

  export type ProdutoCreateWithoutMovimentacoesInput = {
    dataCadastro?: Date | string
    nome: string
    unidadesPorPack?: number
    qtdAtual?: number
    qtdMinima?: number
    qtdMaxima?: number
    custoDeCompra: Decimal | DecimalJsLike | number | string
    precoDeVenda: Decimal | DecimalJsLike | number | string
    categoria: CategoriaCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoUncheckedCreateWithoutMovimentacoesInput = {
    id?: number
    dataCadastro?: Date | string
    nome: string
    unidadesPorPack?: number
    qtdAtual?: number
    qtdMinima?: number
    qtdMaxima?: number
    custoDeCompra: Decimal | DecimalJsLike | number | string
    precoDeVenda: Decimal | DecimalJsLike | number | string
    categoriaId: number
  }

  export type ProdutoCreateOrConnectWithoutMovimentacoesInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutMovimentacoesInput, ProdutoUncheckedCreateWithoutMovimentacoesInput>
  }

  export type ProdutoUpsertWithoutMovimentacoesInput = {
    update: XOR<ProdutoUpdateWithoutMovimentacoesInput, ProdutoUncheckedUpdateWithoutMovimentacoesInput>
    create: XOR<ProdutoCreateWithoutMovimentacoesInput, ProdutoUncheckedCreateWithoutMovimentacoesInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutMovimentacoesInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutMovimentacoesInput, ProdutoUncheckedUpdateWithoutMovimentacoesInput>
  }

  export type ProdutoUpdateWithoutMovimentacoesInput = {
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    unidadesPorPack?: IntFieldUpdateOperationsInput | number
    qtdAtual?: IntFieldUpdateOperationsInput | number
    qtdMinima?: IntFieldUpdateOperationsInput | number
    qtdMaxima?: IntFieldUpdateOperationsInput | number
    custoDeCompra?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    categoria?: CategoriaUpdateOneRequiredWithoutProdutosNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutMovimentacoesInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    unidadesPorPack?: IntFieldUpdateOperationsInput | number
    qtdAtual?: IntFieldUpdateOperationsInput | number
    qtdMinima?: IntFieldUpdateOperationsInput | number
    qtdMaxima?: IntFieldUpdateOperationsInput | number
    custoDeCompra?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    categoriaId?: IntFieldUpdateOperationsInput | number
  }

  export type ProdutoCreateManyCategoriaInput = {
    id?: number
    dataCadastro?: Date | string
    nome: string
    unidadesPorPack?: number
    qtdAtual?: number
    qtdMinima?: number
    qtdMaxima?: number
    custoDeCompra: Decimal | DecimalJsLike | number | string
    precoDeVenda: Decimal | DecimalJsLike | number | string
  }

  export type ProdutoUpdateWithoutCategoriaInput = {
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    unidadesPorPack?: IntFieldUpdateOperationsInput | number
    qtdAtual?: IntFieldUpdateOperationsInput | number
    qtdMinima?: IntFieldUpdateOperationsInput | number
    qtdMaxima?: IntFieldUpdateOperationsInput | number
    custoDeCompra?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    movimentacoes?: MovimentacaoUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutCategoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    unidadesPorPack?: IntFieldUpdateOperationsInput | number
    qtdAtual?: IntFieldUpdateOperationsInput | number
    qtdMinima?: IntFieldUpdateOperationsInput | number
    qtdMaxima?: IntFieldUpdateOperationsInput | number
    custoDeCompra?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    movimentacoes?: MovimentacaoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateManyWithoutCategoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    unidadesPorPack?: IntFieldUpdateOperationsInput | number
    qtdAtual?: IntFieldUpdateOperationsInput | number
    qtdMinima?: IntFieldUpdateOperationsInput | number
    qtdMaxima?: IntFieldUpdateOperationsInput | number
    custoDeCompra?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precoDeVenda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type MovimentacaoCreateManyProdutoInput = {
    id?: number
    dataMovimentacao?: Date | string
    quantidade: number
    precoVendaUnitario: Decimal | DecimalJsLike | number | string
    tipo: string
    lucroEstimado: Decimal | DecimalJsLike | number | string
    destinoCliente: string
    conferenteResponsavel: string
  }

  export type MovimentacaoUpdateWithoutProdutoInput = {
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoVendaUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    lucroEstimado?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFieldUpdateOperationsInput | string
    conferenteResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type MovimentacaoUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoVendaUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    lucroEstimado?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFieldUpdateOperationsInput | string
    conferenteResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type MovimentacaoUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataMovimentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    precoVendaUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    lucroEstimado?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    destinoCliente?: StringFieldUpdateOperationsInput | string
    conferenteResponsavel?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}