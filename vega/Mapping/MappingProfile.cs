using System.Linq;
using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;


namespace vega.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();

            CreateMap<Vehicle, VehicleResource>()
            .ForMember(vr => vr.contact, opt => opt.MapFrom(v => new Contact {Name = v.ContactName, Phone = v.ContactPhone, Email = v.ContactEmail}))
            .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.VehicleFeatures.Select(vf => vf.FeatureId)));

            //From Resource to Domain Model
            CreateMap<VehicleResource, Vehicle>()
            .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.contact.Name))
            .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.contact.Phone))
            .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.contact.Email))
            .ForMember(v => v.VehicleFeatures, opt => opt.Ignore())
            .AfterMap(  (vr, v) => {
                //ToAddFeatures
                    var AddedFeatures = vr.Features.Where(f => !v.VehicleFeatures.Any(vf => vf.FeatureId == f)).Select(id => new VehicleFeature { FeatureId = id});
                    foreach(var f in AddedFeatures)
                        v.VehicleFeatures.Add(f);

                //ToRemoveFeatures
                    var FeaturesToRemove = v.VehicleFeatures.Where(f => !vr.Features.Contains(f.FeatureId));
                    foreach(var f in FeaturesToRemove)
                        v.VehicleFeatures.Remove(f);   

                
            });
            
        }
    }
}