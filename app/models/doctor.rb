class Doctor < ActiveRecord::Base
  belongs_to :account
  has_many :appointments
end
