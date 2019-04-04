class NodeController < ApplicationController
  def index
  	
  	@first_node = Node.first
  end

  def show
  	  @node = Node.find(params[:id])

  	  metric_value_id = @node.metric_value_id
  	  metric_value = MetricValue.find_by id: metric_value_id

  	  if true == @node.first_node
  	  	Metric.all.each do |m|
  			session[m.name] = metric_value.value
  		end
  	  end 
  	  # metric_values = @node.metric_values
  	 #  metric_values = @node.metric_values
  	 #  edges = @node.edges

  	 #  edges.each do |e|
  	 #  	@metric_operations = e.metric_operations
  	 #  	next_node_id = e.target_node_id
  		# next_node = Node.find_by id: next_node_id
  		# metric_values.each do |m|
  		# 	metric_operation = @metric_operations.find_by metric_value_id: m.id 
  		# 	puts @count = metric_operation.count
  		# 	puts "METRICAAAAAAAA====================\n"+m.metrics_id.to_s
  		# 	MetricValue.create!(:metrics_id => m.metrics_id, :value => m.value - @count, :node_id => next_node_id)
  		# end
  	 #  end

  end
end
