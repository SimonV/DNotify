class AppointmentsController < ApplicationController
  def get_appt_summary
    start = Date.parse(params[:start])
    first_date = start.at_beginning_of_month.next_month
    last_date = start.at_end_of_month.next_month

    #TODO render events from model
    resp = [{title: 'test',
              start: '2016-01-01T18:00:00.000Z',
              #end: '2016-01-01T19:00:00.000Z',
              allDay: true,
              id: 10,
              rendering: 'background',
              color: '#257e4a'},
            {title: 'test',
              start: '2016-01-01T18:00:00.000Z',
              #end: '2016-01-01T19:00:00.000Z',
              id: 11,
              color: '#FFAACC'}]
    render json: resp
  end

  def get_free_slots
    #TODO render events from model
  end

  def list_appts
    #TODO render events from model
  end
end
