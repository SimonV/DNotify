# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160321105455) do

  create_table "accounts", force: :cascade do |t|
    t.string   "username"
    t.string   "hashed_passoword"
    t.string   "full_name"
    t.string   "phone"
    t.string   "email"
    t.string   "billing_plan_type"
    t.datetime "billing_plan_start_time"
    t.boolean  "is_active"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "appointments", force: :cascade do |t|
    t.integer  "doctor_id"
    t.integer  "customer_id"
    t.datetime "start_time"
    t.integer  "dutation"
    t.string   "description"
    t.string   "status"
    t.datetime "status_change_time"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "appointments", ["customer_id"], name: "index_appointments_on_customer_id"
  add_index "appointments", ["doctor_id"], name: "index_appointments_on_doctor_id"

  create_table "customers", force: :cascade do |t|
    t.integer  "account_id"
    t.string   "name"
    t.string   "last_name"
    t.string   "phone"
    t.string   "email"
    t.string   "description"
    t.boolean  "is_active"
    t.boolean  "is_notified"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "customers", ["account_id"], name: "index_customers_on_account_id"

  create_table "doctors", force: :cascade do |t|
    t.integer  "account_id"
    t.string   "full_name"
    t.string   "phone"
    t.string   "email"
    t.boolean  "is_active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "doctors", ["account_id"], name: "index_doctors_on_account_id"

  create_table "reminders", force: :cascade do |t|
    t.integer  "appointment_id"
    t.datetime "send_time"
    t.string   "status"
    t.datetime "status_time"
    t.string   "text"
    t.string   "response_text"
    t.datetime "response_time"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "reminders", ["appointment_id"], name: "index_reminders_on_appointment_id"

end
