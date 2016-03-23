# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
accounts = Account.create([{username: "account_uno", full_name: "Account One", is_active: true},
                            {username: "account_duo", full_name: "Account Two", is_active: true}])

doctor = Doctor.create({account: accounts.first, full_name: "Doc", is_active: true})

customers = Customer.create([{account: accounts.first, name: "Johny", last_name: "Doe", is_active: true},
                              {account: accounts.first, name: "Phil", last_name: "Doe", is_active: true},
                              {account: accounts.first, name: "Andy", last_name: "Doe", is_active: true}])

appts = Appointment.create([{   doctor: doctor,
                                customer: customers[0],
                                start_time: DateTime.new(2016,3,20,8),
                                duration: 15,
                                description: "Appt no 1"
                            },
                            {   doctor: doctor,
                                customer: customers[1],
                                start_time: DateTime.new(2016,3,20,9),
                                duration: 30,
                                description: "Appt no 2"
                            },
                            {   doctor: doctor,
                                customer: customers[2],
                                start_time: DateTime.new(2016,3,20,10),
                                duration: 60,
                                description: "Appt no 3"
                            }])