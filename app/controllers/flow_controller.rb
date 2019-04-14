class FlowController < ApplicationController
  def index
  	# @first_node = Node.find_by :first_node => true
  	# @nodes = Node.all
  	@edges = Edge.all

  	@last_edge = Edge.last
  	# render json: @edges, include: [:nodes]
  end
  
  def edges
	render json: @edges = Edge.all, include: [
		:metric_operations, { 
			:node => { include: [
				{ :metric_values => {include: :metric}}
			]}
		}
	]

	@last_edge_id = Edge.last.id
  end
end
