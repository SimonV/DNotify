require 'test_helper'

class DoctorsControllerTest < ActionController::TestCase
  test "should get activate" do
    get :activate
    assert_response :success
  end

end
