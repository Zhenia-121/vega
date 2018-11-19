using System.Linq;
using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;

namespace vega.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            //From Domain to Resources
            CreateMap<Account, AccountResource>();
            CreateMap<Photo, PhotoResource>();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<Make, MakeResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.contact, opt => opt.MapFrom(v => new ContactResource {Name = v.ContactName, Phone = v.ContactPhone, Email = v.ContactEmail}))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource {Id = vf.FeatureId, Name = vf.Feature.Name} )));

            CreateMap<Vehicle, VehicleResource>()
            .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource {Name = v.ContactName, Phone = v.ContactPhone, Email = v.ContactEmail}))
            .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource {Id = vf.Feature.Id, Name = vf.Feature.Name} )))
            .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make));


            //From Resource to Domain Model
            CreateMap<AccountResource, Account>();
            CreateMap<VehicleQueryResource, VehicleQuery>();
            CreateMap<SaveVehicleResource, Vehicle>()
            .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.contact.Name))
            .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.contact.Phone))
            .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.contact.Email))
            .ForMember(v => v.Features, opt => opt.Ignore())
            .AfterMap(  (vr, v) => {
                //ToAddFeatures
                    var AddedFeatures = vr.Features.Where(f => !v.Features.Any(vf => vf.FeatureId == f)).Select(id => new VehicleFeature { FeatureId = id}).ToList();
                    foreach(var f in AddedFeatures)
                        v.Features.Add(f);

                //ToRemoveFeatures
                    var FeaturesToRemove = v.Features.Where(f => !vr.Features.Contains(f.FeatureId)).ToList();
                    foreach(var f in FeaturesToRemove)
                        v.Features.Remove(f);   

                
            });
            
        }
    }
}