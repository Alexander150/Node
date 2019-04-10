# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_10_135100) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "edges", force: :cascade do |t|
    t.bigint "node_id"
    t.string "name"
    t.bigint "metric_operation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "target_node_id"
    t.index ["metric_operation_id"], name: "index_edges_on_metric_operation_id"
    t.index ["node_id"], name: "index_edges_on_node_id"
  end

  create_table "metric_operations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "edge_id"
    t.integer "metric_value_id"
    t.integer "value"
    t.integer "metric_id"
  end

  create_table "metric_values", force: :cascade do |t|
    t.bigint "metrics_id"
    t.integer "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "node_id"
    t.string "name"
    t.boolean "has_to_be_entered"
    t.index ["metrics_id"], name: "index_metric_values_on_metrics_id"
  end

  create_table "metrics", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type_metric"
  end

  create_table "nodes", force: :cascade do |t|
    t.bigint "metric_value_id"
    t.string "name"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "edge_id"
    t.boolean "first_node"
    t.boolean "last_node"
    t.index ["metric_value_id"], name: "index_nodes_on_metric_value_id"
  end

  add_foreign_key "edges", "metric_operations"
  add_foreign_key "edges", "nodes"
  add_foreign_key "metric_values", "metrics", column: "metrics_id"
  add_foreign_key "nodes", "metric_values"
end
