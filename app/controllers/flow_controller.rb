class FlowController < ApplicationController
  def index
  	@edges = []
  	@first_node = Node.find_by :first_node => true
  	@last_node = Node.find_by :last_node => true
  	current_node = @first_node
  	while (!current_node.nil?)
       @edges+=[current_node.edges[0]]
       # if (current_node.edges[0].target_node.nil?)
       # 	@last_edge = current_node.edges[0]
       # end
       current_node_id = current_node.edges[0].target_node_id
       current_node = Node.find_by id: current_node_id
  	end
  	# @edges = Edge.all
  end

  def edges
  	@edges = []
  	@first_node = Node.find_by :first_node => true
  	@last_node = Node.find_by :last_node => true
  	current_node = @first_node
  	while (!current_node.nil?)
       @edges+=[current_node.edges[0]]
       # if (current_node.edges[0].target_node.nil?)
       # 	@last_edge = current_node.edges[0]
       # end
       current_node_id = current_node.edges[0].target_node_id
       current_node = Node.find_by id: current_node_id
  	end
  	
	render json: @edges, include: [
		:metric_operations, { 
			:node => { include: [
				{ :metric_values => {include: :metric}}
			]}
		}
	]

	@last_edge_id = Edge.last.id
  end
end
