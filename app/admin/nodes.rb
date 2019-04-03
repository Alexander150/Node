ActiveAdmin.register Node do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :name, :body, :edge_id, :metric_value_id

form do |f|
	f.inputs do
		f.input :name, label: "Название узла: "
		f.input :body, label: "Текст узла: "
		f.input :edge_id, label: "Связанные edges: ", as: :select, collection: Edge.all.map { |e| [e.name, e.id] }
		f.input :metric_value_id, label: "Значения метрик: ", as: :select, collection: MetricValue.all.map { |e| [e.name, e.id]  }
	end
	f.actions
end
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end
