ActiveAdmin.register MetricOperation do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :metric_value_id, :name, :edge_id

form do |f|
	f.inputs do
		f.input :metric_value_id, label: "Связанные метрики: ", as: :select, collection: MetricValue.all.map { |e| [e.name, e.id] }
		f.input :name, label: "Название операции: "
		f.input :edge_id, label: "Связанные edges: ", as: :select, collection: Edge.all.map { |e| [e.name, e.id] }
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
