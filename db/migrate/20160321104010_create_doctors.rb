class CreateDoctors < ActiveRecord::Migration
  def change
    create_table :doctors do |t|
      t.references :account, index: true, foreign_key: true
      t.string :full_name
      t.string :phone
      t.string :email
      t.boolean :is_active

      t.timestamps null: false
    end
  end
end
