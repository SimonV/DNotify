class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :username
      t.string :hashed_passoword
      t.string :full_name
      t.string :phone
      t.string :email
      t.string :billing_plan_type
      t.datetime :billing_plan_start_time
      t.boolean :is_active

      t.timestamps null: false
    end
  end
end
