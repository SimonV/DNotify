class AppointmentsController < ApplicationController
  def get_appt_summary
    start = Date.parse(params[:start])
    first_date = start.at_beginning_of_month.next_month
    last_date = start.at_end_of_month.next_month
    #year = params[:year]

    resp = [{title: 'test', start: '2016-01-01T18:00:00.000Z', end: '2016-01-01T19:00:00.000Z', id: 10}]
    render json: resp
  end

  def get_free_slots
  end

  def list_appts
  end
end
