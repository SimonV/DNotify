class AppointmentsController < ApplicationController

  MAX_APPTS = 24
  def create

  end

  def get_monthly_summaries
    resp = []

    #start = Date.parse(params[:start])
    start = Time.parse(params[:start])
    offset = Time.zone_offset(start.zone)

    first_date = start.at_beginning_of_month.next_month
    last_date = start.at_end_of_month.next_month

    appts = Appointment.where(start_time: first_date..last_date).order('start_time')

    count = 0
    if appts.size > 0
      date = appts[0].start_time.strftime("%Y-%m-%d")
      earliest_time = appts[0].start_time
      latest_time = appts[0].start_time

      appts.each do |apt|
        count += 1

        if !date.eql?(apt.start_time.strftime("%Y-%m-%d"))
          resp.push(*build_day_summary(earliest_time, latest_time, offset, count))

          earliest_time = apt.start_time
          date = apt.start_time.strftime("%Y-%m-%d")
          count = 1
        end

        latest_time = apt.start_time
      end

      resp.push(*build_day_summary(earliest_time, latest_time, offset, count))

    end
    render json: resp
  end

  def get_daily_free_slots
    start = Date.parse(params[:start])
    first_date = start.at_beginning_of_day
    last_date = start.at_end_of_day

    #TODO add filtering by doctor
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
    #start = Date.parse(params[:start])
    start = Time.zone.parse(params[:start])
    first_date = start.at_beginning_of_day
    last_date = start.at_end_of_day

    #TODO add filtering by doctor
    appts = Appointment.where(:start_time => first_date..last_date)

    resp = appts.map do |appt|
        {
          title: appt.description,
          start: appt.start_time,
          id: appt.id,
          end: appt.start_time + appt.duration.minutes
        }
    end

    render json: resp
  end

  def create

    #TODO validate busness hours
    #TODO validate overlaping
    apt = Appointment.create( doctor_id: 1, #TODO change
                              customer_id: 1, #TODO change
                              start_time: params[:appt_date],
                              duration: params[:appt_duration],
                              description: params[:appt_description])
    render json: {}
  end

  def show
    apt = Appointment.find(params[:appt_id])

    resp = {}
    resp[:appt_id] = apt.id
    resp[:appt_time] = apt.start_time
    resp[:appt_duration] = apt.duration
    resp[:appt_description] = apt.description
    resp[:appt_customer_name] = apt.customer.name
    resp[:appt_customer_last_name] = apt.customer.last_name
    resp[:appt_customer_phone] = apt.customer.phone
    resp[:appt_customer_email] = apt.customer.email

    render json: resp.to_json
  end

  def update
    #TODO validate busness hours
    #TODO validate overlaping
    apt = Appointment.update(params[:appt_id], { start_time: params[:appt_date],
                                            duration: params[:appt_duration],
                                            description: params[:appt_description]})
    render json: {}
  end

  private

  def build_day_summary(earliest_time, latest_time, offset, count)
    resp = []
    resp.push({title: '',
              start: (earliest_time - offset).at_beginning_of_day,
              allDay: true,
              rendering: 'background',
              color: get_color_for_count(count)})
    resp.push({title: "From: #{(earliest_time + offset).strftime("%H:%M")}",
              start: earliest_time})
    resp.push({title: "To: #{(latest_time + offset).strftime("%H:%M")}",
              start: latest_time})
    resp
  end

  def get_color_for_count(count)
    case (count)
      when 0..3
         color = "#5ED381"
      when 4..7
        color = "#4ABBGC"
      when 8..11
        color = "#1FAD4A"
      when 12..15
        color = "#FCC2CD"
      when 16..19
        color = "#F893A7"
      when 20..24
        color = "#DA274A"
      else
       color = "#5Ed381"
    end
    color
  end
end
