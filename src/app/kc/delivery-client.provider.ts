import { DeliveryClient, TypeResolver } from 'kentico-cloud-delivery';

import { Homepage } from '../models/homepage';
import { Projects } from '../models/projects';
import { Cards } from '../models/cards';
import { Skill } from '../models/skill';
import { config } from 'dotenv';
import { parse } from 'url';

export function DeliveryClientFactory() {

  return new DeliveryClient({
    projectId: '9c64273b-4605-00f2-7b03-c8adac2625a0',
    typeResolvers: [
      new TypeResolver('projects', () => new Projects()),
      new TypeResolver('homepage', () => new Homepage()),
      new TypeResolver('cards', () => new Cards()),
      new TypeResolver('skill', () => new Skill()),
    ]
  });
}

export const DeliveryClientProvider = {
  provide: DeliveryClient,
  useFactory: DeliveryClientFactory,
  deps: []
};
