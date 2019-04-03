ActiveAdmin.register MetricValue do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :metric_id, :value, :node_id, :name

form do |f|
	f.inputs do
		f.input :name, label: "Название значения: "
		f.input :value, label: "Значение метрики: "
		f.input :metric_id, label: "Связанные метрики: ", as: :select, collection: Metric.all.map { |e| [e.name, e.id] }
		f,input :node_id, label: "Связанные ноды: ", as: :select, collection: Node.all.map { |e| [e.name, e.id]  }
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
