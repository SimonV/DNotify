class Customer < ActiveRecord::Base
  belongs_to :account
  has_many :appointments
end
