/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("products", {
    id: "id",
    name: { type: "varchar(200)", notNull: true },
    description: { type: "text", notNull: true },
    price: { type: "double", notNull: true },
    active: { type: "boolean", notNull: true },
    created_at: { type: "varchar(80)", notNull: true },
    updated_at: { type: "varchar(80)", notNull: false },
  });
  pgm.createIndex("products", "id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
