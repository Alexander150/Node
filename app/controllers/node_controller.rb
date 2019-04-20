class NodeController < ApplicationController
  def index
  	@first_node = Node.find_by first_node: true
  end

  def show
  	  @node = Node.find(params[:id])

  	  metric_value_id = @node.metric_value_id
  	  metric_value = MetricValue.find_by id: metric_value_id

  	  if true == @node.first_node
  	  	Metric.all.each do |m|
	  	  	if "Число" == m.type_metric 
	  			session[m.name] = 100
	  		end
	  		if "Строка" == m.type_metric
	  			session[m.name] = "sdfghjkl"
	  		end
	  	end
  	  end 
  	  if params["value"]
  	  	Metric.all.each do |m|
	  	  	if "Число" == m.type_metric 
		  		session[m.name] += params["value"].to_i
		  	end
		  	if "Строка" == m.type_metric
		  		session[m.name] = "sdfghjkl"
		  	end
		end
	  end
  end

  def create
    metric = params.require(:metric_value)["metric"]
    @metric = Metric.find_by name:  metric
    
    @metric_value = MetricValue.new(metric: @metric, value: params.require(:metric_value)["value"])
    @metric_value.save!

  	@node = Node.new(node_params)
  	@node.save!

    @node.update_attributes!(metric_value_id: @metric_value.id)

  	@edge = Edge.find_by id: params.require(:edge)

  	@new_edge = Edge.new(node_id: @node.id, target_node_id: @edge.target_node_id)
  	@new_edge.save!

  	@edge.update_attributes!(target_node_id: @node.id)
  end

  private
	  def node_params
	    params.require(:node).permit(:name, :body, :first_node, :last_node, :metric_value, :edges)
	  end
end