Rails.application.routes.draw do
  get 'flow/index'
  # get 'node/index'
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :node do
  	resources :edges
  end

  resources :edges

  root 'node#index'
end
