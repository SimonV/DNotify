class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.references :account, index: true, foreign_key: true
      t.string :name
      t.string :last_name
      t.string :phone
      t.string :email
      t.string :description
      t.boolean :is_active
      t.boolean :is_notified

      t.timestamps null: false
    end
  end
end
