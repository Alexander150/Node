class FlowController < ApplicationController
  def index
  	@nodes = Node.all

  	@last_node = Node.last

  end
end
