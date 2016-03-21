require 'test_helper'

class AppointmentsControllerTest < ActionController::TestCase
  test "should get get_appt_summary" do
    get :get_appt_summary
    assert_response :success
  end

  test "should get get_free_slots" do
    get :get_free_slots
    assert_response :success
  end

  test "should get list_appts" do
    get :list_appts
    assert_response :success
  end

end
