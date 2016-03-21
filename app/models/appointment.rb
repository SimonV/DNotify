class Appointment < ActiveRecord::Base
  belongs_to :doctor
  belongs_to :customer
end
