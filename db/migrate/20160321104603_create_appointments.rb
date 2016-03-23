class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.references :doctor, index: true, foreign_key: true
      t.references :customer, index: true, foreign_key: true
      t.datetime :start_time
      t.integer :duration
      t.string :description
      t.string :status
      t.datetime :status_change_time

      t.timestamps null: false
    end
  end
end
