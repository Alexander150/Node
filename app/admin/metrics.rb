ActiveAdmin.register Metric do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :name, :type_metric

form do |f|
	f.inputs do
		f.input :name, label: "Название метрики: "
		f.input :type_metric, label: "Тип метрики: ", as: :select, collection: DataType.all.map{|x| [x.name, x.id]}
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
