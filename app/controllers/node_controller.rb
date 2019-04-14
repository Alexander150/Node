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
  	@node = Node.new(node_params)
  	@node.save
  end

  private
	  def node_params
	    params.require(:node).permit(:name, :body, :first_node, :last_node, :metric_value, :edges)
	  end
end
