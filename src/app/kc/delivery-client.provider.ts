import { DeliveryClient, TypeResolver } from 'kentico-cloud-delivery';

import { Project } from '../models/project.class';
import { config } from 'dotenv';
import { parse } from 'url';

export function DeliveryClientFactory() {

  return new DeliveryClient({
    projectId: '9c64273b-4605-00f2-7b03-c8adac2625a0',
    typeResolvers: [
      new TypeResolver('project', () => new Project())
    ]
  });
}

export const DeliveryClientProvider = {
  provide: DeliveryClient,
  useFactory: DeliveryClientFactory,
  deps: []
};