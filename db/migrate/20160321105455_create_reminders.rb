class CreateReminders < ActiveRecord::Migration
  def change
    create_table :reminders do |t|
      t.references :appointment, index: true, foreign_key: true
      t.datetime :send_time
      t.string :status
      t.datetime :status_time
      t.string :text
      t.string :response_text
      t.datetime :response_time

      t.timestamps null: false
    end
  end
end
