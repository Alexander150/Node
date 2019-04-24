class FlowController < ApplicationController
  def index
  	@edges = []
    @metrics = Metric.all
    @metric_values = MetricValue.all

  	@first_node = Node.find_by :first_node => true
  	@last_node = Node.find_by :last_node => true
  	current_node = @first_node
  	while (!current_node.nil?)
      # if (current_node.edges.count==0) then return; end
      @edges+=[current_node.edges[0]]

      if (current_node.edges[0] != nil)
       	current_node = Node.find_by id: current_node.edges[0].target_node_id
      else
       	current_node = nil
      end
  	end
  end

  def edges
    @edges = []

    @first_node = Node.find_by :first_node => true
    @last_node = Node.find_by :last_node => true
    current_node = @first_node
    while (!current_node.nil?)
      @edges+=[current_node.edges[0]]
       
      if (current_node.edges[0] != nil)
        current_node = Node.find_by id: current_node.edges[0].target_node_id
      else
        current_node = nil
      end
    end

  	render json: @edges, include: [
  		:metric_operations, { 
  			:node => { include: [
  				{ :metric_values => {include: :metric}}
  			]}
  		}
  	]
  end
end
