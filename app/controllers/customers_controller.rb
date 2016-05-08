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
    render json: {}
  end

  def show
    # TODO limit by doctor/account
    customer = Customers.find_first(customer_id: params[:customer_id])
    render json: customer
  end

end
