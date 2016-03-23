class AppointmentsController < ApplicationController

  def create

  end

  def get_monthly_summaries
    start = Date.parse(params[:start])
    first_date = start.at_beginning_of_month.next_month
    last_date = start.at_end_of_month.next_month

    appts = Appointment.where(:start_time => first_date..last_date)

    #TODO - calculate & color code the slots in background

    resp = appts.map do |appt|
        {
          title: appt.description,
          start: appt.start_time,
          end: appt.start_time + appt.duration

        }
    end

=begin
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
=end
    render json: resp
  end

  def get_daily_free_slots
    start = Date.parse(params[:start])
    first_date = start.at_beginning_of_day
    last_date = start.at_end_of_day

    appts = Appointment.where(:start_time => first_date..last_date)

    resp = appts.map do |appt|
        {
          title: '',
          start: appt.start_time,
          end: appt.start_time + appt.duration.minutes
        }
    end

    render json: resp
  end

  def get_daily
    start = Date.parse(params[:start])
    first_date = start.at_beginning_of_day
    last_date = start.at_end_of_day

    appts = Appointment.where(:start_time => first_date..last_date)

    resp = appts.map do |appt|
        {
          title: appt.description,
          start: appt.start_time,
          end: appt.start_time + appt.duration.minutes
        }
    end

    render json: resp
  end
end
