Rails.application.routes.draw do
  # get 'node/index'
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'node#index'
end
