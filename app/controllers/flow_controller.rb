class FlowController < ApplicationController
  def index
  	# @first_node = Node.find_by :first_node => true
  	# @nodes = Node.all
  	@edges = Edge.all

  	@last_edge = Edge.last
  end
end
