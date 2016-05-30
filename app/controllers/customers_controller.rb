class CustomersController < ApplicationController

  def create
    render json: {}
  end

  def activate
  end

  def update
    render json: {}
  end

  def find
    # TODO limit by doctor/account
    term = params[:search_input]
    customers = Customer.where('name LIKE ? or last_name LIKE ? or phone LIKE ? or email LIKE ?', term, term, term, term)
    render json: customers
  end

  def show
    # TODO limit by doctor/account
    customer = Customers.find_first(customer_id: params[:customer_id])
    render json: customer
  end

end
