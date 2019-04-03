require 'test_helper'

class NodeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get node_index_url
    assert_response :success
  end

end
